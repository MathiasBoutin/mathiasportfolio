"use client";

import { Fragment, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { type GrowthBarBlock } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

const TOTAL_TICKS = 50;
const MIN_VISIBLE_TICKS = 1;
const TICK_STAGGER_S = 0.01;
const TICK_REVEAL_DURATION_S = 0.14;
const TICK_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const NUMBER_ANIMATION_DURATION_S = 0.6;
const COLOR_FADE_DELAY_S = 1.0;
const COLOR_FADE_DURATION_S = 0.8;

type GrowthBarBlockProps = {
  rows: GrowthBarBlock["rows"];
  metricLabel: string;
  metrics?: string[];
  className?: string;
};

function getFilledTickCount(value: number, maxValue: number): number {
  if (maxValue <= 0) {
    return 0;
  }

  const proportional = Math.round((value / maxValue) * TOTAL_TICKS);
  return Math.max(proportional, MIN_VISIBLE_TICKS);
}

function getGrowthPercent(before: number, after: number): number {
  if (before <= 0) {
    return 0;
  }

  return Math.round(((after - before) / before) * 100);
}

function formatGrowthMetric(value: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(value);
}

function AnimatedNumber({
  target,
  format,
  delay = 0,
  duration = NUMBER_ANIMATION_DURATION_S,
  reducedMotion,
}: {
  target: number;
  format: (v: number) => string;
  delay?: number;
  duration?: number;
  reducedMotion: boolean | null;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) => format(Math.round(v)));

  useEffect(() => {
    if (reducedMotion) {
      motionValue.set(target);
      return;
    }

    const timeout = window.setTimeout(() => {
      animate(motionValue, target, {
        duration,
        ease: TICK_REVEAL_EASE,
      });
    }, delay * 1000);

    return () => window.clearTimeout(timeout);
  }, [motionValue, target, delay, duration, reducedMotion]);

  return <motion.span>{display}</motion.span>;
}

type GrowthBarMetricProps = {
  value: number;
  label: string;
  metricClassName: string;
  valueClassName: string;
  unitClassName: string;
  labelClassName: string;
  reducedMotion: boolean | null;
};

function GrowthBarMetric({
  value,
  label,
  metricClassName,
  valueClassName,
  unitClassName,
  labelClassName,
  reducedMotion,
}: GrowthBarMetricProps) {
  return (
    <div className={metricClassName} aria-label={`${formatGrowthMetric(value)} percent, ${label}`}>
      <p className={valueClassName} aria-hidden>
        <AnimatedNumber
          target={value}
          format={formatGrowthMetric}
          reducedMotion={reducedMotion}
        />
        <span className={unitClassName} aria-hidden>
          %
        </span>
      </p>
      <p className={labelClassName} aria-hidden>
        {label}
      </p>
    </div>
  );
}

type TickRowProps = {
  label: string;
  numericValue: number;
  displayFormat: (v: number) => string;
  filledTicks: number;
  rowIndex: number;
  numberDelay: number;
  numberDuration: number;
  rowHeaderClassName: string;
  labelClassName: string;
  valueClassName: string;
  ticksClassName: string;
  tickClassName: string;
  tickFilledClassName: string;
  tickEmptyClassName: string;
  reducedMotion: boolean | null;
};

function TickRow({
  label,
  numericValue,
  displayFormat,
  filledTicks,
  rowIndex,
  numberDelay,
  numberDuration,
  rowHeaderClassName,
  labelClassName,
  valueClassName,
  ticksClassName,
  tickClassName,
  tickFilledClassName,
  tickEmptyClassName,
  reducedMotion,
}: TickRowProps) {
  return (
    <div className="grid gap-2">
      <div className={rowHeaderClassName}>
        <p className={labelClassName}>{label}</p>
        <p className={valueClassName}>
          <AnimatedNumber
            target={numericValue}
            format={displayFormat}
            delay={numberDelay}
            duration={numberDuration}
            reducedMotion={reducedMotion}
          />
        </p>
      </div>
      <div
        className={ticksClassName}
        role="img"
        aria-label={`${label}: ${displayFormat(numericValue)}, ${filledTicks} of ${TOTAL_TICKS} segments filled`}
      >
        {Array.from({ length: TOTAL_TICKS }, (_, tickIndex) => {
          const globalIndex = rowIndex * TOTAL_TICKS + tickIndex;
          const isFilled = tickIndex < filledTicks;

          if (reducedMotion) {
            return (
              <span
                key={tickIndex}
                className={cn(tickClassName, isFilled ? tickFilledClassName : tickEmptyClassName)}
              />
            );
          }

          const tickDelay = globalIndex * TICK_STAGGER_S;
          const totalBarDuration = (TOTAL_TICKS * 2 - 1) * TICK_STAGGER_S + TICK_REVEAL_DURATION_S;
          const colorFadeStart = totalBarDuration + COLOR_FADE_DELAY_S;

          return (
            <span key={tickIndex} className={cn(tickClassName, tickEmptyClassName)}>
              {isFilled ? (
                <motion.span
                  className="absolute inset-0 rounded-[inherit]"
                  initial={{
                    opacity: 0,
                    backgroundColor: "var(--growth-bar-accent)",
                  }}
                  animate={{
                    opacity: 1,
                    backgroundColor: [
                      "var(--growth-bar-accent)",
                      "var(--growth-bar-accent)",
                      "color-mix(in oklab, var(--primary-foreground) 85%, transparent)",
                    ],
                  }}
                  transition={{
                    opacity: {
                      delay: tickDelay,
                      duration: TICK_REVEAL_DURATION_S,
                      ease: TICK_REVEAL_EASE,
                    },
                    backgroundColor: {
                      delay: colorFadeStart,
                      duration: COLOR_FADE_DURATION_S,
                      ease: "easeInOut",
                      times: [0, 0.01, 1],
                    },
                  }}
                />
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function makeRowFormatter(displayValue?: string) {
  if (!displayValue) {
    return (v: number) =>
      new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(v);
  }

  const hasPrefix = displayValue.startsWith("~");
  const hasSuffix = displayValue.endsWith("+");
  const separator = displayValue.includes(" ") ? " " : ",";

  return (v: number) => {
    const formatted = separator === " "
      ? new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(v))
      : new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(v));
    return `${hasPrefix ? "~" : ""}${formatted}${hasSuffix ? "+" : ""}`;
  };
}

export function GrowthBarBlock({ rows, metricLabel, metrics, className }: GrowthBarBlockProps) {
  const layout = getActivePresentationTheme().slots.caseStudyLayout;
  const reducedMotion = useReducedMotion();
  const maxValue = Math.max(...rows.map((row) => row.value));
  const [beforeRow, afterRow] = rows;
  const growthPercent = getGrowthPercent(beforeRow.value, afterRow.value);

  return (
    <div className={cn(layout.growthBarBlock, className)}>
      <div className={layout.growthBarBand}>
        <figure className={layout.growthBarInner}>
          {metrics && metrics.length > 0 ? (
            <div className={layout.growthBarMetrics}>
              {metrics.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="hidden h-5 w-px self-center bg-[var(--primary-foreground)]/25 md:block"
                    />
                  )}
                  <p className={layout.growthBarMetricLine}>{line}</p>
                </Fragment>
              ))}
            </div>
          ) : (
            <GrowthBarMetric
              value={growthPercent}
              label={metricLabel}
              metricClassName={layout.growthBarMetric}
              valueClassName={layout.growthBarMetricValue}
              unitClassName={layout.growthBarMetricUnit}
              labelClassName={layout.growthBarMetricLabel}
              reducedMotion={reducedMotion}
            />
          )}
          <div className={layout.growthBarRows}>
            {rows.map((row, rowIndex) => {
              const rowBarStartDelay = rowIndex * TOTAL_TICKS * TICK_STAGGER_S;
              const rowNumberDuration = rowIndex === 0
                ? NUMBER_ANIMATION_DURATION_S
                : NUMBER_ANIMATION_DURATION_S * 1.6;
              return (
              <TickRow
                key={row.label}
                rowIndex={rowIndex}
                label={row.label}
                numericValue={row.value}
                displayFormat={makeRowFormatter(row.displayValue)}
                filledTicks={getFilledTickCount(row.value, maxValue)}
                numberDelay={rowBarStartDelay}
                numberDuration={rowNumberDuration}
                rowHeaderClassName={layout.growthBarRowHeader}
                labelClassName={layout.growthBarLabel}
                valueClassName={layout.growthBarValue}
                ticksClassName={layout.growthBarTicks}
                tickClassName={layout.growthBarTick}
                tickFilledClassName={layout.growthBarTickFilled}
                tickEmptyClassName={layout.growthBarTickEmpty}
                reducedMotion={reducedMotion}
              />
              );
            })}
          </div>
        </figure>
      </div>
    </div>
  );
}
