---
title: SpringBoot便捷的token验证方式
date: 2022-08-25 14:58:53
tags: [springboot,token,jwt]
categories: springboot
---
在javaWeb中,我们常用JWT作为权限令牌,后端接口对token参数进行解析验证,判断token是否有效.
常用的方式有传递query参数,传递body参数,传递请求头参数...如果每个controller都要写代码进行token验证,将会是十分繁琐的工作. springboot中提供了`HandlerMethodArgumentResolver`参数解析器,配合自定义注解可以大大减少代码冗余.
<!-- more -->
# 1. 前言

在javaWeb中,我们常用JWT(Java Web Token)作为权限令牌,客户端请求后台接口的时候需要携带token参数,后端接口在接收时对token参数进行解析验证,判断token是否有效.

但是我们的接口有很多,如果每个接口都要写验证功能,将会十分的麻烦.

springboot中提供了`HandlerMethodArgumentResolver`参数解析器,配合自定义注解可以大大减少代码冗余.

# 2. 快速开始

## 2.1 自定义注解

```java
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface NeedToken {
    boolean require() default true;
}
```

## 2.2 token对应的pojo类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenParam {
    private String userName;
    private String userId;
}
```

## 2.3 自定义参数解析器

```java
@Component
public class TokenResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.hasParameterAnnotation(NeedToken.class);
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
        // 获取请求头token的内容
        String token = nativeWebRequest.getHeader("token");
        // 解析token
//        Claims claims = decodeToken(token);
//        if (ObjectUtils.isEmpty(claims)) {
//            throw new JwtException("令牌错误或失效");
//        }
        // 用户信息
//        String info = claims.getSubject();
        NeedToken needToken = methodParameter.getParameterAnnotation(NeedToken.class);
        TokenParam tokenParam = new TokenParam();
        //
        if (needToken.require()) {
            tokenParam.setUserId("1");
            tokenParam.setUserName("tgk");
        }
        return tokenParam;
    }

    /**
     * 解析token
     * @param token
     * @return
     */
    private Claims decodeToken(String token) {
        if (ObjectUtils.isEmpty(token)) {
            return null;
        }
        else {
            Claims claims = Jwts.parser().setSigningKey("token").parseClaimsJws(token).getBody();
            return claims;
        }
    }
}
```

## 2.4 webmvc配置添加参数解析器

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Autowired
    private TokenResolver tokenResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(tokenResolver);
    }
}
```

