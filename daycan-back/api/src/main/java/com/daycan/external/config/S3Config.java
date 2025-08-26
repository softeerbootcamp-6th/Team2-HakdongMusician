package com.daycan.external.config;

import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3Config {

  @Bean
  AwsCredentialsProvider awsCredentialsProvider() {
    return DefaultCredentialsProvider.builder()
        .asyncCredentialUpdateEnabled(true)   // 만료 임박 시 백그라운드 갱신
        .reuseLastProviderEnabled(true)       // 갱신 실패 시 직전 자격증명 재사용
        .build();
  }

  @Bean(destroyMethod = "close")
  S3Client s3Client(
      AwsCredentialsProvider creds,
      @Value("${app.aws.region:ap-northeast-2}") String region
  ) {
    var http = ApacheHttpClient.builder()
        .connectionTimeout(Duration.ofMillis(200))
        .socketTimeout(Duration.ofMillis(800))
        .maxConnections(200)
        .build();

    return S3Client.builder()
        .region(Region.of(region))
        .httpClient(http)
        .credentialsProvider(creds)
        .overrideConfiguration(c -> c
            .apiCallAttemptTimeout(Duration.ofSeconds(2))
            .apiCallTimeout(Duration.ofSeconds(5)))
        .build();
  }

  @Bean(destroyMethod = "close")
  S3Presigner s3Presigner(
      AwsCredentialsProvider creds,
      @Value("${app.aws.region:ap-northeast-2}") String region
  ) {
    return S3Presigner.builder()
        .region(Region.of(region))
        .credentialsProvider(creds)
        .build();
  }
}
