package com.daycan.common.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

  @Bean
  public OpenAPI openAPI() {
    return new OpenAPI()
        .info(new Info()
            .title("Daycan API")
            .version("v1.0.0")
            .description("Daycan API 명세입니다."))
        .servers(List.of(
            new Server().url("https://api.daycan.site").description("Production Server"),
            new Server().url("http://localhost:8080").description("Local Server")
        ));
  }
}
