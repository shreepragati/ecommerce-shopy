// package com.example.ecommerces.config;

// import org.apache.http.HttpHost;
// import org.apache.http.auth.AuthScope;
// import org.apache.http.auth.UsernamePasswordCredentials;
// import org.apache.http.impl.client.BasicCredentialsProvider;
// import org.apache.http.conn.ssl.NoopHostnameVerifier;
// import org.apache.http.ssl.SSLContextBuilder;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

// import co.elastic.clients.elasticsearch.ElasticsearchClient;
// import co.elastic.clients.json.jackson.JacksonJsonpMapper;
// import co.elastic.clients.transport.ElasticsearchTransport;
// import co.elastic.clients.transport.rest_client.RestClientTransport;

// import org.elasticsearch.client.RestClient;

// import java.net.URI;
// import java.security.KeyManagementException;
// import java.security.KeyStoreException;
// import java.security.NoSuchAlgorithmException;
// import java.util.stream.Stream;

// import javax.net.ssl.SSLContext;

// @Configuration
// @EnableElasticsearchRepositories(basePackages = "com.example.ecommerces.repository.elasticsearch")
// public class ElasticsearchConfig {

//    @Value("${spring.elasticsearch.uris}")
//    private String[] elasticsearchUris;

//    @Value("${spring.elasticsearch.username}")
//    private String username;

//    @Value("${spring.elasticsearch.password}")
//    private String password;

//    @Bean
//    public ElasticsearchClient elasticsearchClient()
//            throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException {
//        // Set up credentials provider
//        final BasicCredentialsProvider credentialsProvider = new BasicCredentialsProvider();
//        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));


//        // Build SSL context that trusts all certificates (for development only)
//        final SSLContext sslContext = SSLContextBuilder.create()
//                .loadTrustMaterial(null, (certificate, authType) -> true)
//                .build();


//        // Create RestClient with the custom SSL context and hostname verifier
//        RestClient restClient = RestClient.builder(
//                // Convert each URI to HttpHost
//                Stream.of(elasticsearchUris)
//                        .map(uri -> {
//                            URI uriObj = URI.create(uri);
//                            return new HttpHost(uriObj.getHost(), uriObj.getPort(), uriObj.getScheme());
//                        })
//                        .toArray(HttpHost[]::new))
//                .setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder
//                        .setSSLContext(sslContext)
//                        .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
//                        .setDefaultCredentialsProvider(credentialsProvider))
//                .build();


//        // Create the transport with a Jackson mapper
//        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());


//        // And create the API client
//        return new ElasticsearchClient(transport);
//    }
// }
