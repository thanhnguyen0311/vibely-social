package com.cg_vibely_social_service.service;

import java.util.HashMap;
import java.util.List;

public interface StatusService {
    HashMap<String, Boolean> getStatus(List<String> emails);
    void activate(String email);
    void deactivate(String email);
}
