package in.botanicalbliss.store.controller;

import in.botanicalbliss.store.dto.ProfileRequestDto;
import in.botanicalbliss.store.dto.ProfileResponseDto;
import in.botanicalbliss.store.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponseDto> getProfile() {
        ProfileResponseDto responseDto = profileService.getProfile();
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping
    public ResponseEntity<ProfileResponseDto> updateProfile(
            @Validated @RequestBody ProfileRequestDto profileRequestDto) {
        ProfileResponseDto responseDto = profileService.updateProfile(profileRequestDto);
        return ResponseEntity.ok(responseDto);
    }

}
