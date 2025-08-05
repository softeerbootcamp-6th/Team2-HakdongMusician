package com.daycan.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.*;
import io.swagger.v3.oas.models.security.*;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI openAPI() {
    return new OpenAPI()
        .info(new Info()
            .title("👵🏻 Daycan API")
            .version("v1.0.0")
            .description("Daycan API 문서입니다. ...")
        )
        .addServersItem(new Server().url("/")) // 리버스 프록시 고려 시 추가
        .components(new Components().addSecuritySchemes("Authorization", jwtScheme()))
        .addSecurityItem(new SecurityRequirement().addList("Authorization"));
  }

  private SecurityScheme jwtScheme() {
    return new SecurityScheme()
        .type(SecurityScheme.Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT")
        .description("🔐 JWT 토큰을 입력하세요. ex) `Bearer ey...`");
  }

  @Bean
  public GroupedOpenApi publicApi() {
    return GroupedOpenApi.builder()
        .group("public")
        .packagesToScan("com.daycan")
        .pathsToMatch("/**")
        .pathsToExclude("/admin/**")
        .build();
  }

  @Bean
  public GroupedOpenApi adminApi() {
    return GroupedOpenApi.builder()
        .group("admin")
        .packagesToScan("com.daycan")
        .pathsToMatch("/admin/**")
        .build();
  }
}
