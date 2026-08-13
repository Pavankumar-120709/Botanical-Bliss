package in.botanicalbliss.store.repository;

import in.botanicalbliss.store.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
  }