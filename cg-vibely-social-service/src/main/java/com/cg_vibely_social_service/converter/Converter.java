package com.cg_vibely_social_service.converter;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Converter<S, T> {
    T convert(S source);
    S revert (T target);
    List<T> convert(List<S> sources);
    List<S> revert(List<T> targets);
}
