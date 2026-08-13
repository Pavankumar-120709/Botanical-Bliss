package in.botanicalbliss.store.dto;

import in.botanicalbliss.store.entity.DiscountType;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotNull;

public record UpdateDiscountRequestDto(
        @Positive(message = "Discount value must be positive")
        int discount,
        
        @NotNull(message = "Discount type is required")
        DiscountType type
) {}
