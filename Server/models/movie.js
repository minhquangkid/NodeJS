const fs = require("fs");
const path = require("path");

// phải import paging kiểu này mà ko được dùng export - import thông thường
const paging = require("../util/paging");
/////////////

const getPath = (route) => {
  //tạo đường dẫn lấy file json chung
  const p = path.join(path.dirname(process.mainModule.filename), "data", route);
  return p;
};

const Movies = {
  // hàm để đọc file JSON
  all: function (route) {
    return JSON.parse(fs.readFileSync(getPath(route), "utf8"));
  },
};

module.exports = class Movie {
  static getTrend(index) {
    const arr = Movies.all("movieList.json");
    arr.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    return paging(arr, index); // truyền mảng và param page vào
  }

  static getTopRate(index) {
    const arr = Movies.all("movieList.json");
    arr.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    return paging(arr, index);
  }
  //////////// câu 6
  static checkType(idType) {
    const typeArr = Movies.all("genreList.json");
    const result = typeArr.find((item) => {
      return item.id === Number(idType);
    });

    return result;
  }

  static getGenre(genre, index) {
    const arr = Movies.all("movieList.json");

    let arrFilter = [];

    arr.forEach((item) => {
      const genreList = item.genre_ids;
      const final = genreList.find((e) => e === genre.id);
      if (final) {
        arrFilter.push(item);
      }
    });

    const temp = paging(arrFilter, index);
    temp.genre_name = genre.name;

    return temp;
  }
  //////////////// câu 7
  static getTrailer = (id) => {
    const arr = Movies.all("videoList.json");

    const find = arr.find((item) => {
      return item.id === id;
    });

    if (find) {
      const video = find.videos.filter((item) => {
        let a = item.official === true;
        let b = item.site === "YouTube";
        let c = item.type === "Trailer" || item.type === "Teaser";
        return a && b && c;
      });
      //console.log(video);
      const final = video.reduce((a, b) => {
        // hàm để lọc ra lấy ngày gần nhất với hiện tại
        return new Date(a.published_at) > new Date(b.published_at) ? a : b;
      });

      //console.log("sau khi lọc : ", final);

      return final;
    } else {
      return [];
    }
  };
  ////////// câu 8 và 12
  static getResultSearch = (key, detail, index) => {
    const arr = Movies.all("MovieList.json");
    // console.log(key);
    // console.log(detail);

    const firstArr = []; //tạo mảng lọc lần đầu theo key

    arr.forEach((item) => {
      // lọc theo key trước
      const x = item.title ? item.title.toLowerCase().includes(key) : false; // có nhiều API ko có thuộc tính title nên phải kiểm tra xem có tồn tại ko
      const y = item.overview
        ? item.overview.toLowerCase().includes(key)
        : false;

      const check = x || y;

      if (check === true) {
        firstArr.push(item);
      }
    });

    const secondArr = []; // tạo mảng lọc lần 2 theo các tiêu chí phụ nếu có
    const genreTrans = (type) => {
      //console.log(type);
      const typeArr = Movies.all("genreList.json");
      const result = typeArr.find((item) => {
        return item.name === type;
      });
      return result.id;
    };

    firstArr.forEach((item) => {
      let [checkGenre, checkMedia, checkLanguage, checkYear] = [
        true,
        true,
        true,
        true,
      ]; // mặc định cho thỏa mãn hết các tiêu chí nếu như người dùng ko chọn tiêu chí nào
      if (detail.genre !== "all") {
        // khi có sự chọn lựa tiêu chí genre thì chỉ xét mình nó mà ko ảnh hưởng tới các tiêu chí khác (các tiêu chí khác vẫn là true)
        checkGenre = item.genre_ids.find((e) => {
          return e === genreTrans(detail.genre);
        });
      }
      if (detail.mediaType !== "all") {
        checkMedia = item.media_type === detail.mediaType;
      }
      if (detail.language !== "all") {
        checkLanguage = item.original_language === detail.language;
      }
      if (detail.year !== "") {
        checkYear =
          new Date(item.release_date || item.first_air_date).getFullYear() ===
          Number(detail.year);
      }

      const total = checkGenre && checkMedia && checkLanguage && checkYear;
      if (total) {
        secondArr.push(item);
      }
    });

    secondArr.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    return paging(secondArr, index);
  };
};
