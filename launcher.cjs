(async () => {
  try {
    await import("./boot.js");
  } catch (error) {
    console.error("Application startup failed:", error);
    process.exit(1);
  }
})();
