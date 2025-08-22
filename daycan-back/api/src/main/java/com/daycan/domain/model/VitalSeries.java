package com.daycan.domain.model;


import java.time.temporal.Temporal;
import java.util.Map;

public record VitalSeries<T extends Temporal>(
    Map<T, Number> score,
    Map<T, Number> temp,
    Map<T, Number> dia,
    Map<T, Number> sys,
    Map<T, Number> fec,
    Map<T, Number> uri
) {}
