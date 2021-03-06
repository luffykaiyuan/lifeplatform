package com.luffykaiyuan.lifeplatform.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class LoginInterceptorConf implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/adminBack", "/index", "/messageBack", "/placeBack", "/taskBack", "/taskDoing", "/typeBack", "userBack")
                .excludePathPatterns("/login", "/doLogin");
    }
}
