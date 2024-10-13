package com.cookit.app.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", unique = true, nullable = false, length = 100)
    private String username;

    @Column(name="role", length = 10, nullable = true)
    private String role;

    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "passwd", nullable = false, length = 255)
    private String password;

    @Column(name = "photo_url", length = 255)
    private String photoUrl;

    @Column(name = "account_created_on", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp accountCreatedOn;

    @Column(name = "user_rank", nullable = false)
    private Integer userRank = 0;

    @Column(name = "bronze_trophies", nullable = false)
    private Integer bronzeTrophies = 0;

    @Column(name = "silver_trophies", nullable = false)
    private Integer silverTrophies = 0;

    @Column(name = "gold_trophies", nullable = false)
    private Integer goldTrophies = 0;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
