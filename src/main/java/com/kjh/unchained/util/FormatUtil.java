package com.kjh.unchained.util;

import java.time.format.DateTimeFormatter;

public class FormatUtil {
    public static final DateTimeFormatter DEFAULT_DATE_TIME_FORMAT = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss");
    public static final DateTimeFormatter DEFAULT_DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy.MM.dd");
    public static final DateTimeFormatter UTC_DATE_TIME = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
}
