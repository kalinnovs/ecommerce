package com.haastika.dataservice.dataaccess.dao.base;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateOptimisticLockingFailureException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Repository("baseDAO")
@EnableTransactionManagement
public class BaseDAOImpl<T, PK extends Serializable> implements BaseDAO<T, PK> {

    private Class<? extends T> entityClass;

    @Autowired
    private SessionFactory sessionFactory;

    public Class<? extends T> getEntityClass() {
        return entityClass;
    }

    public void setEntityClass(Class<? extends T> entityClass) {
        this.entityClass = entityClass;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public BaseDAOImpl() {
        super();
    }

    public BaseDAOImpl(final Class<T> entityClass) {
        super();
        this.entityClass = entityClass;
    }

    @Override
    public void save(T entity) {
        getCurrentSession().save(entity);
    }

    @Override
    public void add(T entity) {
        getCurrentSession().save(entity);
    }

    @Override
    public void saveOrUpdate(T entity) {
        getCurrentSession().saveOrUpdate(entity);
    }

    @Override
    public void update(T entity) {
        getCurrentSession().update(entity);
    }

    @Override
    public void remove(T entity) {
        getCurrentSession().delete(entity);
    }

    @SuppressWarnings("unchecked")
    @Override
    public T findByPrimaryKey(final PK key) {
        return (T) getCurrentSession().get(getEntityClass(), key);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<T> getAll() {
        return getCurrentSession().createCriteria(getEntityClass()).list();
        // return getCurrentSession().createQuery("FROM " + getEntityClass().getName()).list();

    }

    protected final Session getCurrentSession() {
    	Session session = sessionFactory.getCurrentSession();
    	return session;
    }

    @Override
    public void saveOrUpdate(List<T> entityList) throws Exception {

        if (entityList == null || entityList.size() == 0)
            return;
        try {
            for (T entity : entityList) {
                if (entity != null)
                    saveOrUpdate(entity);
            }
        } catch (HibernateOptimisticLockingFailureException exception) {
            throw new Exception("Exception updating the entity" + entityList, exception);
        } catch (Exception exception) {
            throw new Exception("Exception updating the entity" + entityList, exception);
        }

    }

    @Override
    public Criteria getCriteria() {
        return getCurrentSession().createCriteria(getEntityClass());
    }

    @Override
    public void bulkInsert(List<T> entityList) throws Exception {
        for (final T entity : entityList) {
            getCurrentSession().save(entity);
        }

    }
    @SuppressWarnings("unchecked")
	public T loadEntityByPrimaryKey(Serializable primaryKey) throws Exception {
        try {
            return (T) getCurrentSession().load(entityClass, primaryKey);
        }
        catch (Exception excp)
        {
            throw new Exception("Exception getting the entity. entityClass: " + entityClass
                    + ", primaryKey: " + primaryKey, excp);
        }
    }

}
