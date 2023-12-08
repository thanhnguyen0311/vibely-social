package com.cg_vibely_social_service.configuration;

import com.cg_vibely_social_service.configuration.security.JwtTokenProvider;
import com.cg_vibely_social_service.logging.AppLogger;
import com.cg_vibely_social_service.service.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class WebSocketChannelInterceptor implements ChannelInterceptor {
    private final JwtTokenProvider tokenProvider;
    private final StatusService statusService;
    private final UserDetailsService userDetailsService;

    @Value("${websocket.server_heartbeat_delay_ms}")
    private long serverHeartbeatDelay;
    @Value("${websocket.client_heartbeat_require_ms}")
    private long clientHeartbeatRequire;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (headerAccessor != null && StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
            Object rawHeaders = message.getHeaders().get(SimpMessageHeaderAccessor.NATIVE_HEADERS);
            if (rawHeaders instanceof Map) {
                Object authorHeader = ((Map<?, ?>) rawHeaders).get("Authorization");
                if (authorHeader instanceof ArrayList) {
                    String bearerToken = ((ArrayList<String>) authorHeader).get(0);
                    if (tokenProvider.isTokenValid(bearerToken)) {
                        String email = tokenProvider.extractEmail(bearerToken);
                        if (email != null) {
                            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                            if (userDetails != null) {
                                UsernamePasswordAuthenticationToken authenticationToken =
                                        new UsernamePasswordAuthenticationToken(
                                                userDetails,
                                                null,
                                                userDetails.getAuthorities());
                                headerAccessor.setUser(authenticationToken);
                                headerAccessor.setHeartbeat(serverHeartbeatDelay, clientHeartbeatRequire);
                                return message;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        if (headerAccessor != null && StompCommand.DISCONNECT.equals(headerAccessor.getCommand())) {
            try {
                if (headerAccessor.getUser() != null) {
                    String userEmail = headerAccessor.getUser().getName();
                    statusService.deactivate(userEmail);
                }

            } catch (Exception e) {
                AppLogger.LOGGER.error(e);
            }
        }
        if (headerAccessor != null && StompCommand.SUBSCRIBE.equals(headerAccessor.getCommand())) {
            if (headerAccessor.getUser() == null || headerAccessor.getUser().getName() == null) {
                return null;
            } else {
                String userEmail = headerAccessor.getUser().getName();
                if ("/users/queue/messages".equals(headerAccessor.getDestination())) {
                    statusService.activate(userEmail);
                }
            }

            System.out.println("Some one SUBSCRIBED at: " + headerAccessor.getDestination());
        }

        return message;
    }

    @Override
    public void afterSendCompletion(Message<?> message, MessageChannel channel, boolean sent, Exception ex) {
        StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (headerAccessor != null && StompCommand.SEND.equals(headerAccessor.getCommand())) {
            if (!sent) {
                System.err.println("sent failed");
            }
        }
    }

}
