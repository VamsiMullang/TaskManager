const reportWebVitals = () => {
  if (process.env.NODE_ENV === "production") {
    import("web-vitals").then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      const logMetric = (metric: any) => console.log(metric);
      onCLS(logMetric);
      onFID(logMetric);
      onFCP(logMetric);
      onLCP(logMetric);
      onTTFB(logMetric);
    });
  }
};

export default reportWebVitals;
