package in.botanicalbliss.store.dto;

public record DiscountCalculationRequestDto(
        double originalPrice,
        String discountCode
) {}
