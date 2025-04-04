package com.booking.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void sendBookingConfirmation(String to, String userName, String resourceName,
                                      String startTime, String endTime) throws MessagingException {
        Context context = new Context();
        context.setVariable("userName", userName);
        context.setVariable("resourceName", resourceName);
        context.setVariable("startTime", startTime);
        context.setVariable("endTime", endTime);

        String htmlContent = templateEngine.process("booking-confirmation", context);
        sendHtmlEmail(to, "Booking Confirmation", htmlContent);
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
}
