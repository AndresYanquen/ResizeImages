const testDimension = require("../src/storageController/index");
const controllers = require("../src/controllers/index");
const process = require("../src/storageController/index");

describe("Limites de hoja A4", () => {
  test("Se realiza la comparación de valores (link)", () => {
    const input = { width: 1000, height: 1123 };

    const output = { width: 796, height: 1123 };
    expect(testDimension.resizeAgaintsA4sheet(input, "link")).toEqual(output);
  });
});

describe("Limites de hoja A4", () => {
  test("Se realiza la comparación de valores (link)", () => {
    const input = { width: 600, height: 600 };

    const output = { width: 600, height: 600 };
    expect(testDimension.resizeAgaintsA4sheet(input, "link")).toEqual(output);
  });
});

describe("Iteracion y almacenamiento de Imagenes", () => {
  test("Se envían los datos de las imagenes de prueba (link)", () => {
    const input = {
      fieldname: "image",
      originalname: "fondo.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      destination:
        "E:\\Programacion\\FullStack\\Proteccion\\Backend\\src\\public\\uploads",
      filename: "65bac568-526e-47e6-aba9-b65c0c21e41e.jpg",
      path: "E:\\Programacion\\FullStack\\Proteccion\\Backend\\src\\public\\uploads\\65bac568-526e-47e6-aba9-b65c0c21e41e.jpg",
      size: 54850,
    };
  });
});

describe("Prueba unitaria definir sentido de la imagen", () => {
  test("Se envían dimensiones de la imagen a la funcion", () => {
    const input = { width: 1920, height: 1080 };

    const output = "width";
    expect(process.getDirection(input, "link")).toEqual(output);
  });
});
