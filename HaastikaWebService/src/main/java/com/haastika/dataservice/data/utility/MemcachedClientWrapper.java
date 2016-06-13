package com.haastika.dataservice.data.utility;

import java.io.IOException;

import net.spy.memcached.AddrUtil;
import net.spy.memcached.BinaryConnectionFactory;
import net.spy.memcached.MemcachedClient;

public class MemcachedClientWrapper {
    private static final String NAMESPACE= "HAASTIKA:5d41402aba76b97191101";
    private static MemcachedClient instance = null;
     
    public static synchronized MemcachedClient getInstance() throws IOException {
        System.out.println("Instance: " + instance);
        if(instance == null) {
            System.out.println("Creating a new instance");
            instance = new MemcachedClient(new BinaryConnectionFactory(), AddrUtil.getAddresses("127.0.0.1:11211"));
         }
        System.out.println("Instance: " + instance);
         return instance;
    }
     
    public void set(String key, int ttl, final Object o) throws IOException {
    	getInstance().set(NAMESPACE + key, ttl, o);
    }
     
    public Object get(String key) throws IOException {
        Object o = getInstance().get(NAMESPACE + key);
        if(o == null) {
            System.out.println("Cache MISS for KEY: " + key);
        } else {
            System.out.println("Cache HIT for KEY: " + key);
        }
        return o;
    }
     
    public Object delete(String key) throws IOException {
        return getInstance().delete(NAMESPACE + key);  
    }
     
     
}
