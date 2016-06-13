package com.haastika.dataservice.dataaccess.dao.base;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;

public interface BaseDAO<T, PK> {

    public void save(final T entity);

    public void add(final T entity);

    public void saveOrUpdate(final T entity);
    public void saveOrUpdate(List<T> entityList) throws Exception;

    public void update(final T entity);
   

    public void remove(final T entity);

    public T findByPrimaryKey(final PK key);

    public List<T> getAll();
    public Criteria getCriteria();
    
    public void bulkInsert(List<T> entityList) throws Exception;
    public T loadEntityByPrimaryKey(Serializable primaryKey) throws Exception; 

}
