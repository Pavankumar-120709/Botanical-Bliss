package in.botanicalbliss.store.dto;

import in.botanicalbliss.store.dto.AddressDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class UserDto {

    private Long userId;
    private String name;
    private String email;
    private String mobileNumber;
    private String roles;
    private AddressDto address;

}
