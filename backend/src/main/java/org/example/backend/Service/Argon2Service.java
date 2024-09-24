package org.example.backend.Service;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Service;

@Service
public class Argon2Service {

    private final Argon2 argon2;

    public Argon2Service() {
        this.argon2 = Argon2Factory.create();
    }

    public String hashPassword(String password) {
        char[] charPassword = password.toCharArray();
        try {
            return argon2.hash(2, 65536, 1, charPassword);
        } finally {
            argon2.wipeArray(charPassword);
        }
    }

    public boolean verifyPassword(String inputPassword, String hashFromDb) {
        char[] charInputPassword = inputPassword.toCharArray();
        try {
            return argon2.verify(hashFromDb, charInputPassword);
        } finally {
            argon2.wipeArray(charInputPassword);
        }
    }
}
