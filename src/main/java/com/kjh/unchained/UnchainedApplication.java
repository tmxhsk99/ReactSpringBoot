package com.kjh.unchained;

import com.kjh.unchained.springconfig.app.JwtAppConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties(JwtAppConfig.class)
public class UnchainedApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnchainedApplication.class, args);
	}

}
