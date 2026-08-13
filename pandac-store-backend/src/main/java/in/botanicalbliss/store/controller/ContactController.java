package in.botanicalbliss.store.controller;

import in.botanicalbliss.store.dto.ContactInfoDto;
import in.botanicalbliss.store.dto.ContactRequestDto;
import in.botanicalbliss.store.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final ContactInfoDto contactInfoDto;

    @PostMapping
    public ResponseEntity<String> saveContact(
            @Valid @RequestBody ContactRequestDto contactRequestDto) throws InterruptedException {
        contactService.saveContact(contactRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Request processed successfully");
    }

    @GetMapping
    public ResponseEntity<ContactInfoDto> getContactInfo() {
        return ResponseEntity.ok(contactInfoDto);
    }



}
