package com.haastika.dataservice.data.utility;

import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.util.UUID;

import org.springframework.stereotype.Component;

@Component("promoCodeGenerator")
public class PromoCodeGenerator {

    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static SecureRandom secureRandom = new SecureRandom();

    public String generateAlphaNumericPromo(int promoLength) {
        final StringBuilder promoCode = new StringBuilder();
        while (promoLength-- != 0) {
            int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
            promoCode.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        System.out.println("Alphanumeric string" + promoCode.toString());
        return promoCode.toString();

    }

    public String generateSecureRandomPromo(final int promoCodeLength) {
        final StringBuilder promoCode = new StringBuilder(promoCodeLength);
        for (int i = 0; i < promoCodeLength; i++)
            promoCode.append(ALPHA_NUMERIC_STRING.charAt(secureRandom.nextInt(ALPHA_NUMERIC_STRING.length())));
        return promoCode.toString();
    }

    public String generteshortUUIDPromoCode() {
        final UUID uuid = UUID.randomUUID();
        long uuidLength = ByteBuffer.wrap(uuid.toString().getBytes()).getLong();
        final String promoCode = Long.toString(uuidLength, Character.MAX_RADIX).replaceAll("-","");
        return promoCode;
    }

}
