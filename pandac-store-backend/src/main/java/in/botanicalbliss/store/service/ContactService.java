package in.botanicalbliss.store.service;


import in.botanicalbliss.store.dto.ContactRequestDto;
import in.botanicalbliss.store.dto.ContactResponseDto;

import java.util.List;

public interface ContactService {

    boolean saveContact(ContactRequestDto contactRequestDto);

    List<ContactResponseDto> getAllOpenMessages();

    void updateMessageStatus(Long contactId, String status);
}
