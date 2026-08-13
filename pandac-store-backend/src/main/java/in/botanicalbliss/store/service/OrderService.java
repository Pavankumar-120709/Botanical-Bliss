package in.botanicalbliss.store.service;

import in.botanicalbliss.store.dto.OrderRequestDto;
import in.botanicalbliss.store.dto.OrderResponseDto;

import java.util.List;

public interface OrderService {

    void createOrder(OrderRequestDto orderRequest);

    List<OrderResponseDto> getCustomerOrders();

    List<OrderResponseDto> getAllPendingOrders();

    void updateOrderStatus(Long orderId, String orderStatus);
}
