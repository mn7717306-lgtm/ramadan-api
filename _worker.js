export default {
  async fetch(request) {
    const city = request.cf.city || "Rawalpindi";
    const lat = request.cf.latitude || "33.5973";
    const lon = request.cf.longitude || "73.0479";
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.code === 200) {
        const timings = result.data.timings;
        const data = {
          success: true,
          city: city,
          date: result.data.date.readable,
          hijri: result.data.date.hijri.day + " " + result.data.date.hijri.month.en,
          sehar: timings.Fajr,
          iftar: timings.Maghrib
        };
        return new Response(JSON.stringify(data), {
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          }
        });
      } else {
        return new Response(JSON.stringify({ success: false, error: "Data error" }));
      }
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: "Server error" }));
    }
  }
};
