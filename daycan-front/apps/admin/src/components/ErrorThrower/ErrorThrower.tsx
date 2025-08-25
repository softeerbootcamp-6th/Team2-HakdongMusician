export function ErrorThrower({
  shouldCrash = false,
}: {
  shouldCrash?: boolean;
}) {
  if (shouldCrash) throw new Error("💥 Render crash (in render phase)");
  return null;
}
