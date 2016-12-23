var data = [
  {
    id: 123,
    seq: 1,
    url: "http://www.google.com",
    fileType: "html",
    loadTimeMS: 100,
    source: { // This would be the PA Agent because we are on the html page
      lat: 51.56,
      long: 0.8
    },
    dest: {
      lat: 50.0,
      long: 8.5
    }
  },
  {
    id: 124,
    seq: 2,
    url: "https://ssl.gstatic.com/gb/images/i1_1967ca6a.png",
    fileType: "png",
    loadTimeMS: 200,
    source: {
      lat: 50.0,
      long: 8.5
    },
    dest: {
      lat: 42.30,
      long: -93.5
    }
  }
];