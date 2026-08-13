package in.botanicalbliss.store.dto;

import in.botanicalbliss.store.entity.DiscountType;

public record DiscountDto(String code, int discount, DiscountType type) {}