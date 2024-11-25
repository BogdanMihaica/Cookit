package com.cookit.app.configs;

import com.cookit.app.services.JwtService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class WebSocketInterceptor implements WebSocketHandlerDecoratorFactory {

    @Autowired
    private JwtService jwtService;

    @Autowired
    UserDetailsService userDetailsService;

    @NonNull
    @Override
    public WebSocketHandler decorate(@NonNull WebSocketHandler handler) {
        return new WebSocketHandlerDecorator(handler) {
            @Override
            public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
                String token = getTokenFromSession(session);

                try {
                    if (token == null) {
                        throw new RuntimeException("Token is missing in the URL");
                    }

                    String username = jwtService.extractUsername(token);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    if (!jwtService.isTokenValid(token, userDetails)) {
                        throw new RuntimeException("Invalid or expired token");
                    }
                } catch (Exception e) {
                    throw new RuntimeException("JWT validation failed", e);
                }

                super.afterConnectionEstablished(session);
            }
        };
    }

    private String getTokenFromSession(WebSocketSession session) {
        // Extragem parametrul "token" din URL-ul sesiunii WebSocket
        String uri = session.getUri().toString();
        String tokenParam = "token=";

        int tokenStartIndex = uri.indexOf(tokenParam);
        if (tokenStartIndex != -1) {
            String token = uri.substring(tokenStartIndex + tokenParam.length());
            int tokenEndIndex = token.indexOf('&');
            if (tokenEndIndex != -1) {
                token = token.substring(0, tokenEndIndex);
            }
            return token;
        }

        return null; // Dacă nu se găsește token-ul
    }
}
