package com.daycan.auth.security;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHasher {
  private PasswordHasher() {}

  public static String hash(String raw) {
    return BCrypt.hashpw(raw, BCrypt.gensalt());
  }

  public static boolean matches(String raw, String hashed) {
    return BCrypt.checkpw(raw, hashed);
  }

}
