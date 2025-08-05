package com.daycan.auth.annotation;

import java.lang.annotation.*;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented

public @interface AuthenticatedUser {
}

