package in.botanicalbliss.store.service;


import in.botanicalbliss.store.dto.ProfileRequestDto;
import in.botanicalbliss.store.dto.ProfileResponseDto;
import in.botanicalbliss.store.entity.Customer;

public interface ProfileService {

    ProfileResponseDto getProfile();

    ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto);

    Customer getAuthenticatedCustomer();
}
