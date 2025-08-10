package com.daycan.config;

import java.net.URI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3Config {

  @Bean
  S3Client s3Client(
      @Value("${app.aws.region:ap-northeast-2}") String region
//      , @Value("${app.s3.endpoint:}") String endpoint
  ) {
    var builder = S3Client.builder()
        .region(Region.of(region))
        .credentialsProvider(DefaultCredentialsProvider.create());

//    if (!endpoint.isBlank()) {
//      builder = builder
//          .endpointOverride(URI.create(endpoint))
//          .serviceConfiguration(S3Configuration.builder()
//              .pathStyleAccessEnabled(true) // MinIO/LocalStack 호환
//              .build());
//    }
    return builder.build();
  }

  @Bean
  S3Presigner s3Presigner(
      @Value("${app.aws.region:ap-northeast-2}") String region
//      , @Value("${app.s3.endpoint:}") String endpoint
  ) {
    var builder = S3Presigner.builder()
        .region(Region.of(region))
        .credentialsProvider(DefaultCredentialsProvider.create());

//    if (!endpoint.isBlank()) {
//      builder = builder.endpointOverride(URI.create(endpoint));
//    }
    return builder.build();
  }
}