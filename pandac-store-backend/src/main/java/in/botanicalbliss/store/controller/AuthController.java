package in.botanicalbliss.store.controller;

import in.botanicalbliss.store.entity.Customer;
import in.botanicalbliss.store.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final CustomerRepository customerRepository;

    @PostMapping("/sync")
    public ResponseEntity<?> syncUser(@AuthenticationPrincipal Jwt jwt, @RequestBody Map<String, String> request) {
        String clerkId = jwt.getSubject();
        Customer customer = customerRepository.findByClerkId(clerkId).orElse(new Customer());
        customer.setClerkId(clerkId);
        
        String email = request.get("email");
        if (email != null) {
            customer.setEmail(email);
        } else if (customer.getEmail() == null) {
            customer.setEmail(clerkId + "@placeholder.com");
        }
        
        String name = request.get("name");
        if (name != null) {
            customer.setName(name);
        } else if (customer.getName() == null) {
            customer.setName("User");
        }

        if (customer.getMobileNumber() == null) {
            customer.setMobileNumber("0000000000");
        }
        
        customerRepository.save(customer);
        return ResponseEntity.ok().build();
    }
}
