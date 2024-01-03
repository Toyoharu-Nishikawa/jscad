// src/utils/application.ts
var AppDefined = class {
  constructor(name) {
    this.name = name;
    this.values = [];
  }
  values;
  add(code, value) {
    this.values.push({ code, value });
  }
  clear() {
    this.values.length = 0;
  }
  tagify(mg) {
    if (this.values.length > 0) {
      mg.add(102, `{${this.name}`);
      this.values.forEach((tag2) => mg.add(tag2.code, tag2.value));
      mg.add(102, "}");
    }
  }
};

// src/utils/functions.ts
function point(x, y, z) {
  x ??= 0, y ??= 0, z ??= 0;
  return { x, y, z };
}
function point2d(x, y) {
  x ??= 0, y ??= 0;
  return { x, y };
}
function tag(code, value) {
  return { code, value };
}
function stringByteSize(value) {
  return new Blob([value]).size;
}
function stringChunksSplit(value, length = 255) {
  const chunks = [];
  const tempChunk = [];
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    tempChunk.push(char);
    if (tempChunk.length === length || i === value.length - 1) {
      chunks.push(tempChunk.join(""));
      tempChunk.length = 0;
    }
  }
  return chunks;
}
function extrusion() {
  return point(0, 0, 1);
}
function nknots(n, degree) {
  return n + degree + 1;
}
function uniformKnots(n, degree) {
  const knots = [];
  for (let i = 0; i < nknots(n, degree); i++)
    knots.push(i);
  return knots;
}
function openUniformKnots(n, degree) {
  const knots = [];
  let k = 0;
  for (let i = 0; i < nknots(n, degree); i++) {
    if (i <= degree || i >= n + 1)
      knots.push(k);
    else
      knots.push(++k);
  }
  return knots;
}
function deg(rad2) {
  return rad2 * 180 / Math.PI;
}
function rad(deg2) {
  return deg2 * Math.PI / 180;
}
function angle(start, end) {
  let dir = Math.atan2(end.y - start.y, end.x - start.x);
  if (dir < 0)
    dir += 2 * Math.PI;
  return deg(dir);
}
function polar({ x, y }, angle2, distance) {
  angle2 = rad(angle2);
  const { cos, sin } = Math;
  return point(x + distance * cos(angle2), y + distance * sin(angle2));
}
function onezero(value) {
  if (value == null)
    return;
  return value ? 1 : 0;
}
function bulge(angle2) {
  return Math.tan(angle2 / 4);
}

// src/utils/bbox.ts
function bbox(min, max) {
  min ||= point();
  max ||= point(100, 100, 100);
  return {
    maxX: max.x,
    maxY: max.y,
    maxZ: max.z,
    minX: min.x,
    minY: min.y,
    minZ: min.z
  };
}
var BBox = class _BBox {
  static point(p, radius) {
    radius = radius ?? 100;
    return bbox(
      point(p.x - radius, p.y - radius, p.z - radius),
      point(p.x + radius, p.y + radius, p.z + radius)
    );
  }
  static line(start, end) {
    const box = bbox();
    box.maxX = start.x > end.x ? start.x : end.x;
    box.maxY = start.y > end.y ? start.y : end.y;
    box.maxZ = start.z > end.z ? start.z : end.z;
    box.minX = start.x < end.x ? start.x : end.x;
    box.minY = start.y < end.y ? start.y : end.y;
    box.minZ = start.z < end.z ? start.z : end.z;
    return box;
  }
  static points(points) {
    if (points.length === 0)
      return _BBox.point(point());
    const box = bbox();
    points.forEach((p) => {
      if (box.maxX < p.x)
        box.maxX = p.x;
      if (box.maxY < p.y)
        box.maxY = p.y;
      if (box.maxZ < p.z)
        box.maxZ = p.z;
      if (box.minX > p.x)
        box.minX = p.x;
      if (box.minY > p.y)
        box.minY = p.y;
      if (box.minZ > p.z)
        box.minZ = p.z;
    });
    return box;
  }
  static boxes(boxes) {
    if (boxes.length === 0)
      return _BBox.point(point());
    const points = [];
    boxes.forEach((box) => {
      points.push(point(box.maxX, box.maxY, box.maxZ));
      points.push(point(box.minX, box.minY, box.minZ));
    });
    return _BBox.points(points);
  }
  static center(box) {
    return point(
      box.minX + (box.maxX - box.minX) / 2,
      box.minY + (box.maxY - box.minY) / 2,
      box.minZ + (box.maxZ - box.minZ) / 2
    );
  }
  static height(box) {
    return box.maxY - box.minY;
  }
};

// src/utils/color.ts
var TrueColor = class _TrueColor {
  static fromHex(hex) {
    return parseInt(hex.replace("#", ""), 16);
  }
  static fromRGB(r, g, b) {
    const hex = [r, g, b].reduce((acc, c) => {
      const h = c.toString(16);
      return `${acc}${h.length === 1 ? `0${h}` : h}`;
    }, "0x00");
    return _TrueColor.fromHex(hex);
  }
};

// src/utils/constants.ts
var Units = {
  Unitless: 0,
  Inches: 1,
  Feet: 2,
  Miles: 3,
  Millimeters: 4,
  Centimeters: 5,
  Meters: 6,
  Kilometers: 7,
  Microinches: 8,
  Mils: 9,
  Yards: 10,
  Angstroms: 11,
  Nanometers: 12,
  Microns: 13,
  Decimeters: 14,
  Decameters: 15,
  Hectometers: 16,
  Gigameters: 17,
  AstronomicalUnits: 18,
  LightYears: 19,
  Parsecs: 20,
  USSurveyFeet: 21,
  USSurveyInch: 22,
  USSurveyYard: 23,
  USSurveyMile: 24
};
var Colors = {
  Red: 1,
  Green: 3,
  Cyan: 4,
  Blue: 5,
  Magenta: 6,
  White: 7,
  Black: 0,
  Yellow: 2
};
var LineTypes = {
  Continuous: "Continuous"
};

// src/utils/seeder.ts
var Seeder = class {
  seed;
  constructor() {
    this.seed = 0;
  }
  next() {
    return (++this.seed).toString(16).toUpperCase();
  }
  peek() {
    return (this.seed + 1).toString(16).toUpperCase();
  }
};

// src/utils/tags.ts
var TagsManager = class {
  lines;
  constructor() {
    this.lines = [];
  }
  clear() {
    this.lines.length = 0;
  }
  add(code, value) {
    if (value != null)
      this.lines.push(code, value);
  }
  sectionStart(name) {
    this.add(0, "SECTION");
    this.add(2, name);
  }
  sectionEnd() {
    this.add(0, "ENDSEC");
  }
  point2d(point2, digit = 0) {
    if (point2 == null)
      return;
    this.add(10 + digit, point2.x);
    this.add(20 + digit, point2.y);
  }
  point(point2, digit = 0) {
    if (point2 == null)
      return;
    this.point2d(point2, digit);
    this.add(30 + digit, point2.z);
  }
  stringify() {
    return this.lines.join("\n");
  }
};

// src/utils/text.ts
var StyledText = class {
  text;
  paragraph;
  get value() {
    if (this.text === "")
      return "";
    let value = `{${this.text}}`;
    if (this.paragraph)
      value += "\\P";
    return value;
  }
  constructor(paragraph) {
    this.paragraph = paragraph || false;
    this.text = "";
  }
  add(options) {
    if (!options || options.value === "")
      return;
    let font = "";
    let style = "";
    if (options.fontFamily)
      font += `\\f${options.fontFamily}`;
    if (options.bold)
      font += "|b1";
    if (options.italic)
      font += "|i1";
    if (options.center)
      font += "|c1";
    if (font !== "")
      font += ";";
    if (options.underline)
      style += "\\L";
    if (options.colorNumber)
      style += `\\C${options.colorNumber}`;
    if (style !== "")
      style += ";";
    this.text += `${style}${font}${options.value}`;
  }
};
var TextBuilder = class {
  texts;
  get value() {
    return this.texts.map((t) => t.value).join("");
  }
  constructor() {
    this.texts = [];
  }
  add(options, paragraph) {
    const txt = new StyledText(paragraph);
    txt.add(options);
    this.texts.push(txt);
    return txt;
  }
};

// src/utils/xdata.ts
var XData = class {
  constructor(name) {
    this.name = name;
    this.tags = [];
  }
  tags;
  xpoint(point2, digit = 0) {
    this.tags.push(tag(1010 + digit, point2.x));
    this.tags.push(tag(1020 + digit, point2.y));
    this.tags.push(tag(1030 + digit, point2.z));
  }
  clear() {
    this.tags.length = 0;
  }
  string(string) {
    stringChunksSplit(string).forEach(
      (chunk) => this.tags.push(tag(1e3, chunk))
    );
  }
  beginList() {
    this.tags.push(tag(1002, "{"));
  }
  endList() {
    this.tags.push(tag(1002, "}"));
  }
  layerName(name) {
    this.tags.push(tag(1003, name));
  }
  binaryData(data) {
    stringChunksSplit(data).forEach(
      (chunk) => this.tags.push(tag(1004, chunk))
    );
  }
  databaseHandle(handleSeed) {
    this.tags.push(tag(1005, handleSeed));
  }
  point(point2) {
    this.xpoint(point2);
  }
  position(position) {
    this.xpoint(position, 1);
  }
  displacement(displacement) {
    this.xpoint(displacement, 2);
  }
  direction(direction) {
    this.xpoint(direction, 3);
  }
  real(real) {
    this.tags.push(tag(1040, real));
  }
  distance(distance) {
    this.tags.push(tag(1041, distance));
  }
  scale(scale) {
    this.tags.push(tag(1042, scale));
  }
  integer(integer) {
    this.tags.push(tag(1070, integer));
  }
  long(long) {
    this.tags.push(tag(1071, long));
  }
  tagify(mg) {
    mg.add(1001, this.name);
    mg.add(1002, "{");
    this.tags.forEach((t) => mg.add(t.code, t.value));
    mg.add(1002, "}");
  }
};

// src/blocks/endblk.ts
var EndBlk = class {
  handle;
  applications;
  ownerObjectHandle;
  layerName;
  constructor({ seeder }) {
    this.handle = seeder.next();
    this.applications = [];
    this.ownerObjectHandle = "0";
    this.layerName = "0";
  }
  addAppDefined(name) {
    const f = this.applications.find((a2) => a2.name === name);
    if (f)
      return f;
    const a = new AppDefined(name);
    this.applications.push(a);
    return a;
  }
  tagify(mg) {
    mg.add(0, "ENDBLK");
    mg.add(5, this.handle);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(8, this.layerName);
    mg.add(100, "AcDbBlockEnd");
  }
};

// src/entities/entity.ts
var Entity = class {
  seeder;
  handle;
  _type;
  ownerObjectHandle;
  inPaperSpace;
  layoutTabName;
  layerName;
  lineTypeName;
  materialObjectHandle;
  colorNumber;
  lineWeight;
  lineTypeScale;
  visible;
  proxyEntityGraphics;
  trueColor;
  colorNumberClassLevel;
  transparencyClassLevel;
  plotStyleObjectHandle;
  shadowMode;
  applications;
  reactors;
  xdictionary;
  xdatas;
  get visibility() {
    if (this.visible == null)
      return;
    return this.visible ? 0 : 1;
  }
  get type() {
    return this._type;
  }
  get changeOwner() {
    return true;
  }
  constructor(options) {
    this.seeder = options.seeder;
    this._type = "";
    this.handle = this.seeder.next();
    this.ownerObjectHandle = "0";
    this.inPaperSpace = options?.inPaperSpace;
    this.layoutTabName = options?.layoutTabName;
    this.layerName = options?.layerName;
    this.lineTypeName = options?.lineTypeName;
    this.materialObjectHandle = options?.materialObjectHandle;
    this.colorNumber = options?.colorNumber;
    this.lineWeight = options?.lineWeight;
    this.lineTypeScale = options?.lineTypeScale;
    this.visible = options?.visible;
    this.proxyEntityGraphics = options?.proxyEntityGraphics;
    this.trueColor = options?.trueColor;
    this.colorNumberClassLevel = options?.colorNumberClassLevel;
    this.transparencyClassLevel = options?.transparencyClassLevel;
    this.plotStyleObjectHandle = options?.plotStyleObjectHandle;
    this.shadowMode = options?.shadowMode;
    this.applications = [];
    this.reactors = this.addAppDefined("ACAD_REACTORS");
    this.xdictionary = this.addAppDefined("ACAD_XDICTIONARY");
    this.xdatas = [];
  }
  addAppDefined(name) {
    const f = this.applications.find((a2) => a2.name === name);
    if (f)
      return f;
    const a = new AppDefined(name);
    this.applications.push(a);
    return a;
  }
  addXData(name) {
    const f = this.xdatas.find((x2) => x2.name === name);
    if (f)
      return f;
    const x = new XData(name);
    this.xdatas.push(x);
    return x;
  }
  bbox() {
    return BBox.point(point());
  }
  tagify(mg) {
    mg.add(0, this.type);
    mg.add(5, this.handle);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(67, onezero(this.inPaperSpace));
    mg.add(410, this.layoutTabName);
    mg.add(8, this.layerName || "0");
    mg.add(6, this.lineTypeName);
    mg.add(347, this.materialObjectHandle);
    mg.add(62, this.colorNumber);
    mg.add(370, this.lineWeight);
    mg.add(48, this.lineTypeScale);
    mg.add(60, this.visibility);
    if (this.proxyEntityGraphics) {
      mg.add(92, stringByteSize(this.proxyEntityGraphics));
      stringChunksSplit(this.proxyEntityGraphics).forEach((c) => {
        mg.add(310, c);
      });
    }
    mg.add(420, this.trueColor);
    mg.add(430, this.colorNumberClassLevel);
    mg.add(440, this.transparencyClassLevel);
    mg.add(390, this.plotStyleObjectHandle);
    mg.add(284, this.shadowMode);
    mg.add(100, this.subClassMarker);
    this.tagifyChild(mg);
    this.xdatas.forEach((x) => x.tagify(mg));
  }
};

// src/entities/arc.ts
var Arc = class extends Entity {
  thickness;
  center;
  radius;
  startAngle;
  endAngle;
  get subClassMarker() {
    return "AcDbCircle";
  }
  constructor(options) {
    super(options);
    this._type = "ARC";
    this.thickness = options.thickness;
    this.center = options.center;
    this.radius = options.radius;
    this.startAngle = options.startAngle;
    this.endAngle = options.endAngle;
  }
  bbox() {
    return BBox.point(this.center);
  }
  tagifyChild(mg) {
    mg.add(39, this.thickness);
    mg.point(this.center);
    mg.add(40, this.radius);
    mg.add(100, "AcDbArc");
    mg.add(50, this.startAngle);
    mg.add(51, this.endAngle);
  }
};

// src/entities/circle.ts
var Circle = class extends Entity {
  thickness;
  center;
  radius;
  extrusion;
  get subClassMarker() {
    return "AcDbCircle";
  }
  constructor(options) {
    super(options);
    this._type = "CIRCLE";
    this.thickness = options.thickness;
    this.center = options.center;
    this.radius = options.radius;
    this.extrusion = options.extrusion || extrusion();
  }
  bbox() {
    return BBox.point(this.center);
  }
  tagifyChild(mg) {
    mg.add(39, this.thickness);
    mg.point(this.center);
    mg.add(40, this.radius);
    mg.point(this.extrusion, 200);
  }
};

// src/entities/dimension/dimension.ts
var DimensionType = {
  None: 0,
  Aligned: 1,
  Angular: 2,
  Diameter: 3,
  Radius: 4,
  Angular3Point: 5,
  Ordinate: 6,
  ReferencedByThis: 32,
  OrdinateType: 64,
  UserDefined: 128
};
var DimAttachment = {
  TopLeft: 1,
  TopCenter: 2,
  TopRight: 3,
  MiddleLeft: 4,
  MiddleCenter: 5,
  MiddleRight: 6,
  BottomLeft: 7,
  BottomCenter: 8,
  BottomRight: 9
};
var DimTextLineSpacingStyle = {
  AtLeast: 1,
  Exact: 2
};
var Dimension = class extends Entity {
  blockName;
  definition;
  middle;
  dimensionType;
  attachment;
  textLineSpacingStyle;
  textLineSpacingFactor;
  measurement;
  text;
  textRotation;
  horizontalDirection;
  extrusion;
  dimStyleName;
  get subClassMarker() {
    return "AcDbDimension";
  }
  constructor(options) {
    super(options);
    this._type = "DIMENSION";
    this.blockName = options.blockName;
    this.definition = options.definition;
    this.middle = options.middle;
    this.dimensionType = DimensionType.None;
    this.attachment = options.attachment ?? DimAttachment.MiddleCenter;
    this.textLineSpacingStyle = options.textLineSpacingStyle;
    this.textLineSpacingFactor = options.textLineSpacingFactor;
    this.measurement = options.measurement;
    this.text = options.text;
    this.textRotation = options.textRotation;
    this.horizontalDirection = options.horizontalDirection;
    this.extrusion = options.extrusion ?? extrusion();
    this.dimStyleName = options.dimStyleName;
  }
  tagifyChild(mg) {
    mg.add(2, this.blockName);
    mg.point(this.definition);
    mg.point(this.middle, 1);
    mg.add(70, this.dimensionType);
    mg.add(71, this.attachment);
    mg.add(72, this.textLineSpacingStyle);
    mg.add(41, this.textLineSpacingFactor);
    mg.add(42, this.measurement);
    mg.add(1, this.text);
    mg.add(53, this.textRotation);
    mg.add(51, this.horizontalDirection);
    mg.point(this.extrusion, 200);
    mg.add(3, this.dimStyleName);
  }
};

// src/helpers/angles.ts
function pdeg(value) {
  return periodic(value, 0, 360);
}
function prad(value) {
  return periodic(value, 0, TOW_PI);
}
function angleBetween(target, a, b, radians) {
  const p = radians ? prad : pdeg;
  target = p(target), a = p(a), b = p(b);
  if (a < b)
    return a <= target && target <= b;
  return a <= target || target <= b;
}
function calculateAngle(start, end) {
  let angle2 = Math.atan2(end.y - start.y, end.x - start.x);
  if (angle2 < 0)
    angle2 += TOW_PI;
  return angle2;
}

// src/helpers/constants.ts
var { PI } = Math;
var TOW_PI = PI * 2;
var HALF_PI = PI / 2;
var QUARTER_PI = PI / 4;

// src/helpers/periodic.ts
function periodic(value, rmin, rmax) {
  const range = rmax - rmin;
  while (value > rmax)
    value -= range;
  while (value < rmin)
    value += range;
  return value;
}

// src/helpers/primitives/arc.ts
var ArcPrimitive = class _ArcPrimitive {
  center;
  radius;
  startAngle;
  endAngle;
  clockwise;
  get angle() {
    const { startAngle, endAngle } = this.ccw;
    return periodic(endAngle - startAngle, 0, 360);
  }
  get middleAngle() {
    const { startAngle, endAngle } = this.ccw;
    if (this.clockwise)
      return endAngle + this.angle / 2;
    return startAngle + this.angle / 2;
  }
  get cw() {
    if (this.clockwise)
      return this.clone();
    else {
      const { center, radius, startAngle, endAngle } = this;
      return new _ArcPrimitive({
        center,
        radius,
        startAngle: endAngle,
        endAngle: startAngle,
        clockwise: true
      });
    }
  }
  get ccw() {
    if (this.clockwise) {
      const { center, radius, startAngle, endAngle } = this;
      return new _ArcPrimitive({
        center,
        radius,
        startAngle: endAngle,
        endAngle: startAngle,
        clockwise: false
      });
    } else
      return this.clone();
  }
  get start() {
    return polar(this.center, this.startAngle, this.radius);
  }
  get middle() {
    return polar(this.center, this.middleAngle, this.radius);
  }
  get end() {
    return polar(this.center, this.endAngle, this.radius);
  }
  static from3Points(start, middle, end) {
    const line1 = new LinePrimitive(start, middle);
    const line2 = new LinePrimitive(middle, end);
    const rotated1 = line1.rotate(line1.middle, HALF_PI);
    const rotated2 = line2.rotate(line2.middle, HALF_PI);
    const center = rotated1.intersect(rotated2);
    if (center == null)
      return null;
    const vstart = new Vector(start.x, start.y);
    const radius = center.distance(vstart);
    const startAngle = deg(calculateAngle(center, start));
    const middleAngle = deg(calculateAngle(center, middle));
    const endAngle = deg(calculateAngle(center, end));
    const clockwise = angleBetween(middleAngle, endAngle, startAngle);
    return new _ArcPrimitive({
      center,
      radius,
      startAngle,
      endAngle,
      clockwise
    });
  }
  constructor(options) {
    const { x, y } = options.center;
    this.center = { x, y };
    this.radius = options.radius;
    this.startAngle = options.startAngle;
    this.endAngle = options.endAngle;
    this.clockwise = options.clockwise || false;
  }
  trimStart(length, isChord) {
    const a = isChord ? 2 * Math.asin(length / (2 * this.radius)) : length / this.radius;
    const clone = this.ccw;
    clone.startAngle += deg(a);
    if (this.clockwise)
      return clone.cw;
    return clone;
  }
  trimEnd(length, isChord) {
    const a = isChord ? 2 * Math.asin(length / (2 * this.radius)) : length / this.radius;
    const clone = this.ccw;
    clone.endAngle -= deg(a);
    if (this.clockwise)
      return clone.cw;
    return clone;
  }
  clone() {
    const { center, radius, startAngle, endAngle, clockwise } = this;
    return new _ArcPrimitive({
      center,
      radius,
      startAngle,
      endAngle,
      clockwise
    });
  }
  write(block) {
    const center = point(this.center.x, this.center.y);
    const { radius, startAngle, endAngle } = this.ccw;
    return block.addArc({ center, radius, startAngle, endAngle });
  }
};

// src/helpers/primitives/line.ts
function linep(start, end) {
  return new LinePrimitive(start, end);
}
var LinePrimitive = class _LinePrimitive {
  start;
  end;
  get vector() {
    return Vector.from(this.start, this.end);
  }
  get middle() {
    return this.start.add(this.end).scale(0.5);
  }
  get length() {
    return this.vector.length();
  }
  constructor(start, end) {
    this.start = new Vector(start.x, start.y);
    this.end = new Vector(end.x, end.y);
  }
  rotate(center, angle2) {
    return new _LinePrimitive(
      rotate({ target: this.start, center, angle: angle2 }),
      rotate({ target: this.end, center, angle: angle2 })
    );
  }
  intersect(rhs) {
    const fv = this.vector;
    const sv = rhs.vector;
    const tv = Vector.from(this.start, rhs.start);
    const cross = fv.cross(sv);
    if (cross === 0)
      return null;
    const t = tv.cross(sv) / cross;
    return this.start.add(fv.scale(t));
  }
  trimStart(offset) {
    const vector = this.vector.normalize().scale(offset);
    return new _LinePrimitive(this.start.add(vector), this.end);
  }
  trimEnd(offset) {
    const vector = this.vector.normalize().scale(-offset);
    return new _LinePrimitive(this.start, this.end.add(vector));
  }
  expandStart(offset) {
    const vector = this.vector.normalize().scale(-offset);
    return new _LinePrimitive(this.start.add(vector), this.end);
  }
  expandEnd(offset) {
    const vector = this.vector.normalize().scale(offset);
    return new _LinePrimitive(this.start, this.end.add(vector));
  }
  write(block) {
    const start = point(this.start.x, this.start.y);
    const end = point(this.end.x, this.end.y);
    return block.addLine({ start, end });
  }
};

// src/helpers/primitives/vector.ts
var Vector = class _Vector {
  x;
  y;
  static from(p1, p2) {
    return new _Vector(p2.x - p1.x, p2.y - p1.y);
  }
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(rhs) {
    return new _Vector(this.x + rhs.x, this.y + rhs.y);
  }
  length() {
    return Math.hypot(this.x, this.y);
  }
  normalize() {
    const length = this.length();
    return new _Vector(this.x / length, this.y / length);
  }
  distance(rhs) {
    return Math.hypot(rhs.x - this.x, rhs.y - this.y);
  }
  cross(rhs) {
    return this.x * rhs.y - this.y * rhs.x;
  }
  scale(scalar) {
    return new _Vector(this.x * scalar, this.y * scalar);
  }
};

// src/helpers/transform.ts
function rotate(options) {
  const { target, center, angle: angle2 } = options;
  const cos = Math.cos(angle2);
  const sin = Math.sin(angle2);
  const ox = target.x - center.x;
  const oy = target.y - center.y;
  return point2d(
    center.x + (ox * cos - oy * sin),
    center.y + (ox * sin + oy * cos)
  );
}
function translate(options) {
  const { target, translation } = options;
  return point2d(target.x + translation.x, target.y + translation.y);
}
function transform(options) {
  const { target, translation, center, angle: angle2 } = options;
  return rotate({
    target: translate({ target, translation }),
    center,
    angle: angle2
  });
}

// src/entities/dimension/aligned.ts
var AlignedDimension = class extends Dimension {
  insertion;
  start;
  end;
  offset;
  constructor(options) {
    super(options);
    this.dimensionType = DimensionType.Aligned;
    this.insertion = options.insertion;
    this.start = options.start;
    this.end = options.end;
    this.offset = options.offset ?? 0;
    this._offset();
  }
  tagifyChild(mg) {
    super.tagifyChild(mg);
    mg.add(100, "AcDbAlignedDimension");
    mg.point(this.insertion, 2);
    mg.point(this.start, 3);
    mg.point(this.end, 4);
  }
  _offset() {
    const { offset } = this;
    if (offset == null)
      return;
    const sign = Math.sign(this.offset);
    const a = angle(this.start, this.end) + 90 * sign;
    const start = polar(this.start, a, this.offset);
    this.definition = polar(this.end, a, this.offset);
    const middle = linep(start, this.definition).middle;
    this.middle = point(middle.x, middle.y);
  }
};

// src/entities/dimension/angular/lines.ts
function dline(start, end) {
  return { start, end };
}
var AngularLinesDimension = class extends Dimension {
  firstLine;
  secondLine;
  positionArc;
  constructor(options) {
    super(options);
    this.dimensionType = DimensionType.Angular;
    this.firstLine = options.firstLine;
    this.secondLine = options.secondLine;
    this.positionArc = options.positionArc;
    this.definition = this.secondLine.end;
  }
  tagifyChild(mg) {
    super.tagifyChild(mg);
    mg.add(100, "AcDb2LineAngularDimension");
    mg.point(this.firstLine.start, 3);
    mg.point(this.firstLine.end, 4);
    mg.point(this.secondLine.start, 5);
    mg.point(this.positionArc, 6);
  }
};

// src/entities/dimension/angular/points.ts
var AngularPointsDimension = class extends Dimension {
  center;
  first;
  second;
  constructor(options) {
    super(options);
    this.dimensionType = DimensionType.Angular3Point;
    this.center = options.center;
    this.first = options.first;
    this.second = options.second;
  }
  tagifyChild(mg) {
    super.tagifyChild(mg);
    mg.add(100, "AcDb3PointAngularDimension");
    mg.point(this.first, 3);
    mg.point(this.second, 4);
    mg.point(this.center, 5);
  }
};

// src/entities/dimension/arc.ts
var ArcDimension = class extends Dimension {
  center;
  startPoint;
  endPoint;
  startAngle;
  endAngle;
  isPartial;
  hasLeader;
  firstLeaderPoint;
  secondLeaderPoint;
  constructor(options) {
    super(options);
    this._type = "ARC_DIMENSION";
    this.center = options.center;
    this.startPoint = options.startPoint;
    this.endPoint = options.endPoint;
    this.startAngle = options.startAngle ?? 0;
    this.endAngle = options.endAngle ?? 0;
    this.isPartial = options.isPartial;
    this.hasLeader = options.hasLeader;
    this.firstLeaderPoint = options.firstLeaderPoint;
    this.secondLeaderPoint = options.secondLeaderPoint;
  }
  tagifyChild(mg) {
    super.tagifyChild(mg);
    mg.add(100, "AcDbArcDimension");
    mg.point(this.startPoint, 3);
    mg.point(this.endPoint, 4);
    mg.point(this.center, 5);
    mg.add(40, this.startAngle);
    mg.add(41, this.endAngle);
    mg.add(70, Number(this.isPartial ?? 0));
    mg.add(71, Number(this.hasLeader ?? 0));
    mg.point(this.firstLeaderPoint, 6);
    mg.point(this.secondLeaderPoint, 7);
  }
};

// src/entities/dimension/diameter.ts
var DiameterDimension = class extends Dimension {
  first;
  leaderLength;
  constructor(options) {
    super(options);
    this.dimensionType = DimensionType.Diameter;
    this.first = options.first;
    this.leaderLength = options.leaderLength;
  }
  tagifyChild(mg) {
    super.tagifyChild(mg);
    mg.add(100, "AcDbDiametricDimension");
    mg.point(this.first, 5);
    mg.add(40, this.leaderLength);
  }
};

// src/entities/dimension/linear.ts
var LinearDimension = class extends Dimension {
  insertion;
  start;
  end;
  angle;
  types;
  constructor(options) {
    super(options);
    this.insertion = options.insertion;
    this.start = options.start;
    this.end = options.end;
    this.angle = options.angle ?? 0;
    this.types = options.types;
    this.offset(options.offset);
  }
  tagifyChild(mg) {
    super.tagifyChild(mg);
    mg.add(100, "AcDbAlignedDimension");
    mg.point(this.insertion, 2);
    mg.point(this.start, 3);
    mg.point(this.end, 4);
    mg.add(50, this.angle);
    mg.add(52, this.types);
    mg.add(100, "AcDbRotatedDimension");
  }
  offset(v) {
    if (v == null)
      return;
    this.definition = polar(this.start, this.angle - 90, v);
  }
};

// src/entities/dimension/radial.ts
var RadialDimension = class extends Dimension {
  first;
  leaderLength;
  constructor(options) {
    super(options);
    this.dimensionType = DimensionType.Radius;
    this.first = options.first;
    this.leaderLength = options.leaderLength;
  }
  tagifyChild(mg) {
    super.tagifyChild(mg);
    mg.add(100, "AcDbRadialDimension");
    mg.point(this.first, 5);
    mg.add(40, this.leaderLength);
  }
};

// src/entities/dimension/render/arrow.ts
function arrow(options) {
  return new DimensionArrow(options).entity();
}
var DimensionArrow = class {
  seeder;
  size;
  rotation;
  position;
  constructor(options) {
    this.seeder = options.seeder;
    this.size = options.size ?? 2.5;
    this.rotation = options.rotation ?? 0;
    this.position = options.position ?? point();
  }
  entity() {
    const { size: s, seeder } = this;
    const h = this.size / 3 / 2;
    return new Solid({
      seeder,
      first: this.position,
      second: this._transform(point2d(-s, -h)),
      third: this._transform(point2d(-s, h))
    });
  }
  _transform(target) {
    const result = transform({
      target,
      center: this.position,
      angle: this.rotation,
      translation: this.position
    });
    return point(result.x, result.y);
  }
};

// src/entities/dimension/render/renderer.ts
function round(v, accuracy = 0.01) {
  const EPSILON = Number.EPSILON || Math.pow(2, -52);
  const temp = 1 / accuracy;
  return Math.round((v + EPSILON) * temp) / temp;
}
var DimensionRenderer = class {
  seeder;
  blocks;
  tables;
  _seed;
  get _blockName() {
    return `*D${++this._seed}`;
  }
  constructor(options) {
    this.seeder = options.seeder;
    this.blocks = options.blocks;
    this.tables = options.tables;
    this._seed = 0;
  }
  aligned(dim) {
    const { seeder } = this.blocks;
    const rotation = calculateAngle(dim.start, dim.end);
    const sign = Math.sign(dim.offset);
    const block = this.blocks.addBlock({ name: this._blockName });
    block.currentLayerName = dim.layerName || "0";
    const angle2 = rotation + PI / 2 * sign;
    const start = polar(dim.start, deg(angle2), dim.offset);
    const end = polar(dim.end, deg(angle2), dim.offset);
    block.push(arrow({ seeder, rotation: rotation - PI, position: start }));
    block.push(arrow({ seeder, rotation, position: end }));
    linep(start, end).trimStart(2.5).trimEnd(2.5).write(block);
    this._trimExpand(linep(dim.start, start), block);
    this._trimExpand(linep(dim.end, end), block);
    const layerName = this.tables.addDefpointsLayer();
    block.addPoint({ ...dim.start, layerName });
    block.addPoint({ ...dim.end, layerName });
    const distance = round(linep(dim.start, dim.end).length);
    const middle = linep(start, end).middle;
    dim.textRotation = deg(rotation);
    dim.measurement = distance;
    dim.middle = polar(middle, 90 * sign, 1.25);
    block.addMText({
      insertionPoint: dim.middle,
      height: 2.5,
      value: distance.toString(),
      rotation: deg(rotation),
      attachmentPoint: AttachmentPoint.BottomCenter
    });
    dim.blockName = block.name;
  }
  angularLines(dim) {
    const { seeder } = this.blocks;
    const block = this.blocks.addBlock({ name: this._blockName });
    block.currentLayerName = dim.layerName || "0";
    const fline = linep(dim.firstLine.start, dim.firstLine.end);
    const sline = linep(dim.secondLine.start, dim.secondLine.end);
    const intersection = fline.intersect(sline);
    if (intersection == null)
      return;
    const center = point(intersection.x, intersection.y);
    const radius = linep(center, dim.positionArc).length;
    const startAngle = angle(dim.firstLine.start, dim.firstLine.end);
    const endAngle = angle(dim.secondLine.start, dim.secondLine.end);
    const arc = new ArcPrimitive({ center, endAngle, startAngle, radius });
    const tarc = arc.trimStart(2.5, true).trimEnd(2.5, true);
    tarc.write(block);
    block.push(arrow({
      seeder,
      rotation: calculateAngle(tarc.start, arc.start),
      position: arc.start
    }));
    block.push(arrow({
      seeder,
      rotation: calculateAngle(tarc.end, arc.end),
      position: arc.end
    }));
    dim.middle = polar(arc.middle, arc.middleAngle, 1.25);
    block.addMText({
      insertionPoint: dim.middle,
      height: 2.5,
      value: `${arc.angle.toFixed(2)}\xB0`,
      rotation: arc.middleAngle - 90,
      attachmentPoint: AttachmentPoint.BottomCenter
    });
    if (fline.length <= radius) {
      this._trimExpand(linep(fline.end, arc.start), block);
    }
    if (sline.length <= radius) {
      this._trimExpand(linep(sline.end, arc.end), block);
    }
    dim.blockName = block.name;
  }
  _trimExpand(line, block) {
    line.trimStart(0.625).expandEnd(1.25).write(block);
  }
};

// src/entities/ellipse.ts
var Ellipse = class extends Entity {
  center;
  endpoint;
  extrusion;
  ratio;
  start;
  end;
  get subClassMarker() {
    return "AcDbEllipse";
  }
  constructor(options) {
    super(options);
    this._type = "ELLIPSE";
    this.center = options.center;
    this.endpoint = options.endpoint;
    this.extrusion = options.extrusion || extrusion();
    this.ratio = options.ratio ?? 1;
    this.start = options.start ?? 0;
    this.end = options.end ?? 2 * Math.PI;
  }
  bbox() {
    const { x, y, z } = this.endpoint;
    const radius = Math.sqrt(x * x + y * y + z * z);
    return BBox.point(this.center, radius);
  }
  tagifyChild(mg) {
    mg.point(this.center);
    mg.point(this.endpoint, 1);
    mg.point(this.extrusion, 200);
    mg.add(40, this.ratio);
    mg.add(41, this.start);
    mg.add(42, this.end);
  }
};

// src/entities/entities.ts
var Entities = class {
  blocks;
  get modelSpace() {
    return this.blocks.modelSpace;
  }
  get paperSpace() {
    return this.blocks.paperSpace;
  }
  constructor(options) {
    this.blocks = options.blocks;
  }
  tagify(mg) {
    mg.sectionStart("ENTITIES");
    this.paperSpace.entities.forEach((e) => e.tagify(mg));
    this.modelSpace.entities.forEach((e) => e.tagify(mg));
    mg.sectionEnd();
  }
};

// src/entities/face.ts
var InvisibleEdge = {
  None: 0,
  First: 1,
  Second: 2,
  Third: 4,
  Fourth: 8
};
var Face = class extends Entity {
  first;
  second;
  third;
  fourth;
  flags;
  get subClassMarker() {
    return "AcDbFace";
  }
  constructor(options) {
    super(options);
    this._type = "3DFACE";
    this.first = options.first;
    this.second = options.second;
    this.third = options.third;
    this.fourth = options.fourth || this.third;
    this.flags = options.flags ?? InvisibleEdge.None;
  }
  bbox() {
    return BBox.points([this.first, this.second, this.third, this.fourth]);
  }
  tagifyChild(mg) {
    mg.point(this.first);
    mg.point(this.second, 1);
    mg.point(this.third, 2);
    mg.point(this.fourth, 3);
    mg.add(70, this.flags);
  }
};

// src/entities/hatch/edges.ts
var HatchEdgeType = {
  Line: 1,
  CircularArc: 2,
  EllipticArc: 3,
  Spline: 4
};
var HatchEdges = class {
  edges;
  constructor() {
    this.edges = [];
  }
  add(e) {
    this.edges.push(e);
    return e;
  }
  bbox() {
    return BBox.boxes(this.edges.map((e) => e.bbox()));
  }
  tagify(mg) {
    mg.add(93, this.edges.length);
    this.edges.forEach((e) => e.tagify(mg));
  }
};

// src/entities/hatch/arc.ts
var HatchArc = class {
  type;
  center;
  radius;
  start;
  end;
  clockwise;
  constructor(options) {
    this.type = HatchEdgeType.CircularArc;
    this.center = options.center;
    this.radius = options.radius;
    this.start = options.start;
    this.end = options.end;
    this.clockwise = options.clockwise || true;
  }
  bbox() {
    const c = point(this.center.x, this.center.y);
    return BBox.point(c, this.radius);
  }
  tagify(mg) {
    mg.add(72, this.type);
    mg.point2d(this.center);
    mg.add(40, this.radius);
    mg.add(50, this.start);
    mg.add(51, this.end);
    mg.add(73, onezero(this.clockwise));
  }
};

// src/entities/hatch/ellipse.ts
var HatchEllipse = class {
  type;
  center;
  endpoint;
  ratio;
  start;
  end;
  clockwise;
  constructor(options) {
    this.type = HatchEdgeType.EllipticArc;
    this.center = options.center;
    this.endpoint = options.endpoint;
    this.ratio = options.ratio;
    this.start = options.start;
    this.end = options.end;
    this.clockwise = options.clockwise || true;
  }
  bbox() {
    const { x, y } = this.endpoint;
    const radius = Math.sqrt(x * x + y * y);
    const c = point(this.center.x, this.center.y);
    return BBox.point(c, radius);
  }
  tagify(mg) {
    mg.add(72, this.type);
    mg.point2d(this.center);
    mg.point2d(this.endpoint, 1);
    mg.add(40, this.ratio);
    mg.add(50, this.start);
    mg.add(51, this.end);
    mg.add(73, onezero(this.clockwise));
  }
};

// src/entities/hatch/line.ts
var HatchLine = class {
  type;
  start;
  end;
  constructor(options) {
    this.type = HatchEdgeType.Line;
    this.start = options.start;
    this.end = options.end;
  }
  bbox() {
    const s = point(this.start.x, this.start.y);
    const e = point(this.end.x, this.end.y);
    return BBox.points([s, e]);
  }
  tagify(mg) {
    mg.add(72, this.type);
    mg.point2d(this.start);
    mg.point2d(this.end, 1);
  }
};

// src/entities/hatch/boundary.ts
var BoundaryPathFlag = {
  Default: 0,
  External: 1,
  Polyline: 2,
  Derived: 4,
  Textbox: 8,
  Outermost: 16
};
var HatchBoundaryPath = class {
  flag;
  polylines;
  edges;
  constructor() {
    this.flag = BoundaryPathFlag.External | BoundaryPathFlag.Derived;
    this.polylines = [];
    this.edges = new HatchEdges();
  }
  arc(options) {
    return this.edges.add(new HatchArc(options));
  }
  ellipse(options) {
    return this.edges.add(new HatchEllipse(options));
  }
  line(options) {
    return this.edges.add(new HatchLine(options));
  }
  polyline(p) {
    this.flag |= BoundaryPathFlag.Polyline;
    this.polylines.push(p);
    return p;
  }
  bbox() {
    const p = BBox.boxes(this.polylines.map((p2) => p2.bbox()));
    const e = this.edges.bbox();
    return BBox.boxes([p, e]);
  }
  tagify(mg) {
    mg.add(92, this.flag);
    if (this.flag & BoundaryPathFlag.Polyline) {
      this.polylines.forEach((p) => p.tagify(mg));
    } else
      this.edges.tagify(mg);
    mg.add(97, 0);
  }
};

// src/entities/hatch/gradient.ts
var HatchGradientType = {
  Linear: "LINEAR",
  Cylinder: "CYLINDER",
  InvCylinder: "INVCYLINDER",
  Spherical: "SPHERICAL",
  HemiSpherical: "HEMISPHERICAL",
  Curved: "CURVED",
  InvSpherical: "SPHERICAL",
  InvHemiSpherical: "INVHEMISPHERICAL",
  InvCurved: "INVCURVED"
};
var HatchGradient = class {
  first;
  second;
  angle;
  definition;
  tint;
  type;
  constructor(options) {
    this.first = options.first;
    this.second = options.second || 7;
    this.angle = options.angle ?? 0;
    this.definition = options.definition ?? 0;
    this.tint = options.tint ?? 0;
    this.type = options.type || HatchGradientType.Linear;
  }
  tagify(mg) {
    mg.add(450, 1);
    mg.add(451, 0);
    mg.add(460, rad(this.angle));
    mg.add(461, this.definition);
    mg.add(452, this.second ? 0 : 1);
    mg.add(462, this.tint);
    mg.add(453, 2);
    mg.add(463, 0);
    mg.add(63, this.first);
    mg.add(463, 1);
    mg.add(63, this.second);
    mg.add(470, this.type);
  }
};

// src/entities/hatch/pattern.ts
var SOLID = "SOLID";
var HatchPatternData = class {
  angle;
  base;
  offset;
  dashLengths;
  constructor(options) {
    this.angle = options.angle;
    this.base = options.base;
    this.offset = options.offset;
    this.dashLengths = options.dashLengths;
  }
  tagify(mg) {
    mg.add(53, this.angle);
    mg.add(43, this.base.x);
    mg.add(44, this.base.y);
    mg.add(45, this.offset.x);
    mg.add(46, this.offset.y);
    mg.add(79, this.dashLengths.length);
    this.dashLengths.forEach((d) => mg.add(49, d));
  }
};
var HatchPattern = class {
  name;
  data;
  angle;
  scale;
  double;
  constructor(options) {
    this.name = options.name;
    this.data = options.data || [];
    this.angle = options.angle ?? 0;
    this.scale = options.scale ?? 1;
    this.double = options.double || false;
  }
  add(options) {
    const d = new HatchPatternData(options);
    this.data.push(d);
    return d;
  }
  tagify(mg) {
    if (this.name === SOLID)
      return;
    mg.add(52, this.angle);
    mg.add(41, this.scale);
    mg.add(77, onezero(this.double));
    mg.add(78, this.data.length);
    this.data.forEach((d) => d.tagify(mg));
  }
};

// src/entities/hatch/hatch.ts
var AssociativityFlag = {
  NonAssociative: 0,
  Associative: 1
};
var HatchStyle = {
  OddParity: 0,
  Outermost: 1,
  Through: 2
};
var PatternType = {
  UserDefined: 0,
  Predefined: 1,
  Custom: 2
};
var Hatch = class extends Entity {
  elevation;
  extrusion;
  associativity;
  boundaries;
  style;
  patternType;
  fill;
  get isSolid() {
    return this.patternName === SOLID;
  }
  get patternName() {
    if ("name" in this.fill)
      return this.fill.name;
    return SOLID;
  }
  get subClassMarker() {
    return "AcDbHatch";
  }
  constructor(options) {
    super(options);
    this._type = "HATCH";
    this.elevation = options.elevation ?? 0;
    this.extrusion = options.extrusion || extrusion();
    this.associativity = AssociativityFlag.NonAssociative;
    this.boundaries = [];
    this.style = HatchStyle.Outermost;
    this.patternType = PatternType.Predefined;
    this.fill = options.fill;
  }
  add() {
    const b = new HatchBoundaryPath();
    this.boundaries.push(b);
    return b;
  }
  bbox() {
    return BBox.boxes(this.boundaries.map((b) => b.bbox()));
  }
  tagifyChild(mg) {
    mg.point(point(0, 0, this.elevation));
    mg.point(this.extrusion, 200);
    mg.add(2, this.patternName);
    mg.add(70, onezero(this.isSolid));
    mg.add(71, this.associativity);
    mg.add(91, this.boundaries.length);
    this.boundaries.forEach((b) => b.tagify(mg));
    mg.add(75, this.style);
    mg.add(76, this.patternType);
    if (!this.isSolid)
      this.fill.tagify(mg);
    mg.add(47, 1);
    mg.add(98, 0);
    if (this.isSolid)
      this.fill.tagify(mg);
  }
};

// src/entities/hatch/polyline.ts
var HatchPolyline = class {
  isClosed;
  vertices;
  constructor(options) {
    this.isClosed = options.isClosed;
    this.vertices = options.vertices || [];
  }
  add(vertex) {
    this.vertices.push(vertex);
  }
  bbox() {
    return BBox.points(this.vertices.map((v) => point(v.x, v.y)));
  }
  tagify(mg) {
    mg.add(72, onezero(this.hasBulge()));
    mg.add(73, onezero(this.isClosed));
    mg.add(93, this.vertices.length);
    this.vertices.forEach((v) => {
      mg.point2d(v);
      mg.add(42, v.bulge);
    });
  }
  hasBulge() {
    return this.vertices.some((v) => v.bulge != null);
  }
};

// src/entities/seqend.ts
var SeqEnd = class extends Entity {
  get subClassMarker() {
    return;
  }
  constructor(options) {
    super(options);
    this._type = "SEQEND";
  }
  tagifyChild() {
  }
};

// src/entities/insert.ts
var Insert = class extends Entity {
  followAttributes;
  blockName;
  insertionPoint;
  scale;
  rotation;
  columnCount;
  rowCount;
  columnSpacing;
  rowSpacing;
  extrusion;
  seqend;
  get subClassMarker() {
    return "AcDbBlockReference";
  }
  constructor(options) {
    super(options);
    this._type = "INSERT";
    this.followAttributes = options.followAttributes;
    this.blockName = options.blockName;
    this.insertionPoint = options.insertionPoint || point();
    this.scale = options.scale;
    this.rotation = options.rotation;
    this.columnCount = options.columnCount;
    this.rowCount = options.rowCount;
    this.columnSpacing = options.columnSpacing;
    this.rowSpacing = options.rowSpacing;
    this.extrusion = options.extrusion;
    if (this.followAttributes) {
      this.seqend = new SeqEnd(options);
      this.seqend.ownerObjectHandle = this.handle;
    }
  }
  bbox() {
    return BBox.point(this.insertionPoint);
  }
  tagifyChild(mg) {
    mg.add(66, onezero(this.followAttributes));
    mg.add(2, this.blockName);
    mg.point(this.insertionPoint);
    mg.add(41, this.scale?.x);
    mg.add(42, this.scale?.y);
    mg.add(43, this.scale?.z);
    mg.add(50, this.rotation);
    mg.add(70, this.columnCount);
    mg.add(71, this.rowCount);
    mg.add(44, this.columnSpacing);
    mg.add(45, this.rowSpacing);
    mg.point(this.extrusion, 200);
  }
};

// src/entities/leader.ts
var PathType = {
  Segments: 0,
  Spline: 1
};
var CreationFlag = {
  Text: 0,
  Tolerance: 1,
  BlockRef: 2,
  Without: 3
};
var HooklineDirectionFlag = {
  Opposite: 0,
  Same: 1
};
var Leader = class extends Entity {
  dimStyleName;
  arrowhead;
  pathType;
  creation;
  hooklineDirection;
  hookline;
  height;
  width;
  vertices;
  color;
  annotationHandle;
  normal;
  horizontalDirection;
  blockOffset;
  annotationOffset;
  get subClassMarker() {
    return "AcDbLeader";
  }
  constructor(options) {
    super(options);
    this._type = "LEADER";
    this.dimStyleName = options.dimStyleName;
    this.arrowhead = options.arrowhead;
    this.pathType = options.pathType;
    this.creation = options.creation;
    this.hooklineDirection = options.hooklineDirection;
    this.hookline = options.hookline;
    this.height = options.height;
    this.width = options.width;
    this.vertices = options.vertices;
    this.color = options.color;
    this.annotationHandle = options.annotationHandle;
    this.normal = options.normal;
    this.horizontalDirection = options.horizontalDirection;
    this.blockOffset = options.blockOffset;
    this.annotationOffset = options.annotationOffset;
  }
  bbox() {
    return BBox.points(this.vertices);
  }
  tagifyChild(mg) {
    mg.add(3, this.dimStyleName);
    mg.add(71, onezero(this.arrowhead));
    mg.add(72, this.pathType);
    mg.add(73, this.creation);
    mg.add(74, this.hooklineDirection);
    mg.add(75, onezero(this.hookline));
    mg.add(40, this.height);
    mg.add(41, this.width);
    mg.add(76, this.vertices.length);
    this.vertices.forEach((v) => mg.point(v));
    mg.add(77, this.color);
    mg.add(340, this.annotationHandle);
    mg.point(this.normal, 200);
    mg.point(this.horizontalDirection, 201);
    mg.point(this.blockOffset, 202);
    mg.point(this.annotationOffset, 203);
  }
};

// src/entities/line.ts
var Line = class extends Entity {
  thickness;
  start;
  end;
  extrusion;
  get subClassMarker() {
    return "AcDbLine";
  }
  constructor(options) {
    super(options);
    this._type = "LINE";
    this.thickness = options.thickness ?? 0;
    this.start = options.start;
    this.end = options.end;
    this.extrusion = options.extrusion || extrusion();
  }
  bbox() {
    return BBox.line(this.start, this.end);
  }
  tagifyChild(mg) {
    mg.add(39, this.thickness);
    mg.point(this.start);
    mg.point(this.end, 1);
    mg.point(this.extrusion, 200);
  }
};

// src/entities/lwpolyline.ts
var LWPolylineFlags = {
  None: 0,
  Closed: 1,
  Plinegen: 128
};
var LWPolyline = class extends Entity {
  vertices;
  flags;
  constantWidth;
  elevation;
  thickness;
  extrusion;
  get subClassMarker() {
    return "AcDbPolyline";
  }
  constructor(options) {
    super(options);
    this._type = "LWPOLYLINE";
    this.vertices = options.vertices || [];
    this.flags = options.flags ?? LWPolylineFlags.None;
    this.constantWidth = options.constantWidth ?? 0;
    this.elevation = options.elevation ?? 0;
    this.thickness = options.thickness ?? 0;
    this.extrusion = options.extrusion || extrusion();
  }
  add(v) {
    this.vertices.push(v);
  }
  bbox() {
    return BBox.points(this.vertices.map((v) => point(v.x, v.y)));
  }
  tagifyChild(mg) {
    mg.add(90, this.vertices.length);
    mg.add(70, this.flags);
    mg.add(43, this.constantWidth);
    mg.add(38, this.elevation);
    mg.add(39, this.thickness);
    this.vertices.forEach((v) => {
      mg.point2d(v);
      mg.add(40, v.startingWidth);
      mg.add(41, v.endWidth);
      mg.add(42, v.bulge);
    });
    mg.point(this.extrusion, 200);
  }
};

// src/entities/text.ts
var TextHorizontalJustification = {
  Left: 0,
  Center: 1,
  Right: 2,
  Aligned: 3,
  Middle: 4,
  Fit: 5
};
var TextVerticalJustification = {
  BaseLine: 0,
  Bottom: 1,
  Middle: 2,
  Top: 3
};
var Text = class extends Entity {
  thickness;
  firstAlignmentPoint;
  height;
  value;
  rotation;
  relativeXScaleFactor;
  obliqueAngle;
  styleName;
  generationFlags;
  horizontalJustification;
  secondAlignmentPoint;
  extrusion;
  verticalJustification;
  get subClassMarker() {
    return "AcDbText";
  }
  get subClassMarker2() {
    return this.subClassMarker;
  }
  constructor(options) {
    super(options);
    this._type = "TEXT";
    this.thickness = options.thickness;
    this.firstAlignmentPoint = options.firstAlignmentPoint;
    this.height = options.height;
    this.value = options.value;
    this.rotation = options.rotation;
    this.relativeXScaleFactor = options.relativeXScaleFactor;
    this.obliqueAngle = options.obliqueAngle;
    this.styleName = options.styleName;
    this.generationFlags = options.generationFlags;
    this.horizontalJustification = options.horizontalJustification;
    this.secondAlignmentPoint = options.secondAlignmentPoint;
    this.extrusion = options.extrusion || extrusion();
    this.verticalJustification = options.verticalJustification;
  }
  tagifyChild(mg) {
    mg.add(39, this.thickness);
    mg.point(this.firstAlignmentPoint);
    mg.add(40, this.height);
    mg.add(1, this.value);
    mg.add(50, this.rotation);
    mg.add(41, this.relativeXScaleFactor);
    mg.add(51, this.obliqueAngle);
    mg.add(7, this.styleName);
    mg.add(71, this.generationFlags);
    mg.add(72, this.horizontalJustification);
    mg.point(this.secondAlignmentPoint, 1);
    mg.point(this.extrusion, 200);
    mg.add(100, this.subClassMarker2);
    mg.add(73, this.verticalJustification);
  }
};

// src/entities/attdef.ts
var Attdef = class extends Text {
  prompt;
  tag;
  flags;
  get subClassMarker2() {
    return "AcDbAttributeDefinition";
  }
  constructor(options) {
    super(options);
    this._type = "ATTDEF";
    this.prompt = options.prompt || "";
    this.tag = options.tag;
    this.flags = options.flags || 0;
  }
  tagifyChild(mg) {
    mg.add(39, this.thickness);
    mg.point(this.firstAlignmentPoint);
    mg.add(40, this.height);
    mg.add(1, this.value);
    mg.add(50, this.rotation);
    mg.add(41, this.relativeXScaleFactor);
    mg.add(51, this.obliqueAngle);
    mg.add(7, this.styleName);
    mg.add(71, this.generationFlags);
    mg.add(72, this.horizontalJustification);
    mg.point(this.secondAlignmentPoint, 1);
    mg.add(100, this.subClassMarker2);
    mg.add(280, 0);
    mg.add(3, this.prompt);
    mg.add(2, this.tag);
    mg.add(70, this.flags);
    mg.add(74, this.verticalJustification);
    mg.add(280, 1);
  }
};

// src/entities/attrib.ts
var Attrib = class extends Entity {
  thickness;
  startPoint;
  height;
  value;
  tag;
  flags;
  rotation;
  relativeXScaleFactor;
  obliqueAngle;
  styleName;
  generationFlags;
  horizontalJustification;
  verticalJustification;
  alignmentPoint;
  extrusion;
  insert;
  get subClassMarker() {
    return "AcDbText";
  }
  get changeOwner() {
    return false;
  }
  constructor(options) {
    super(options);
    this._type = "ATTRIB";
    this.thickness = options.thickness;
    this.startPoint = options.startPoint;
    this.height = options.height;
    this.value = options.value;
    this.tag = options.tag;
    this.flags = options.flags ?? 0;
    this.rotation = options.rotation;
    this.relativeXScaleFactor = options.relativeXScaleFactor;
    this.obliqueAngle = options.obliqueAngle;
    this.styleName = options.styleName;
    this.generationFlags = options.generationFlags;
    this.horizontalJustification = options.horizontalJustification;
    this.verticalJustification = options.verticalJustification;
    this.alignmentPoint = options.alignmentPoint;
    this.extrusion = options.extrusion || extrusion();
    this.insert = options.insert;
    this.ownerObjectHandle = options.insert.handle;
  }
  tagifyChild(mg) {
    mg.add(39, this.thickness);
    mg.point(this.startPoint);
    mg.add(40, this.height);
    mg.add(1, this.value);
    mg.add(50, this.rotation);
    mg.add(41, this.relativeXScaleFactor);
    mg.add(51, this.obliqueAngle);
    mg.add(7, this.styleName);
    mg.add(100, "AcDbAttribute");
    mg.add(280, 0);
    mg.add(2, this.tag);
    mg.add(70, this.flags);
    mg.add(71, this.generationFlags);
    mg.add(72, this.horizontalJustification);
    mg.add(74, this.verticalJustification);
    mg.point(this.alignmentPoint, 1);
    mg.add(280, 1);
  }
};

// src/tables/entry.ts
var EntryCommonFlags = {
  None: 0,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64
};
var Entry = class {
  handle;
  type;
  ownerObjectHandle;
  hcode;
  applications;
  reactors;
  xdictionary;
  constructor({ seeder, type, hcode }) {
    this.handle = seeder.next();
    this.type = type;
    this.ownerObjectHandle = "0";
    this.hcode = hcode ?? 5;
    this.applications = [];
    this.reactors = this.addAppDefined("ACAD_REACTORS");
    this.xdictionary = this.addAppDefined("ACAD_XDICTIONARY");
  }
  addAppDefined(name) {
    const f = this.applications.find((a2) => a2.name === name);
    if (f)
      return f;
    const a = new AppDefined(name);
    this.applications.push(a);
    return a;
  }
  tagify(mg) {
    mg.add(0, this.type);
    mg.add(this.hcode, this.handle);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbSymbolTableRecord");
  }
};

// src/tables/table.ts
var XTable = class {
  seeder;
  name;
  handle;
  ownerObjectHandle;
  entries;
  xdictionary;
  constructor(options) {
    this.seeder = options.seeder;
    this.name = options.name;
    this.handle = this.seeder.next();
    this.ownerObjectHandle = "0";
    this.entries = [];
    this.xdictionary = new AppDefined("ACAD_XDICTIONARY");
  }
  addEntry(ctor, options) {
    const entry = new ctor({ seeder: this.seeder, ...options });
    entry.ownerObjectHandle = this.handle;
    this.entries.push(entry);
    return entry;
  }
  find(predicate) {
    return this.entries.find(predicate);
  }
  tagify(mg) {
    mg.add(0, "TABLE");
    mg.add(2, this.name);
    mg.add(5, this.handle);
    this.xdictionary.tagify(mg);
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbSymbolTable");
    mg.add(70, this.entries.length);
    this.entries.forEach((e) => e.tagify(mg));
    mg.add(0, "ENDTAB");
  }
};

// src/tables/appid.ts
var AppIdFlags = {
  None: 0,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64
};
var AppIdEntry = class extends Entry {
  name;
  flags;
  constructor(options) {
    super({ seeder: options.seeder, type: "APPID" });
    this.name = options.name;
    this.flags = options.flags ?? AppIdFlags.None;
  }
  tagify(mg) {
    super.tagify(mg);
    mg.add(100, "AcDbRegAppTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
  }
};
var AppId = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "APPID" });
  }
  add(options) {
    return this.addEntry(AppIdEntry, options);
  }
};

// src/tables/block.ts
var BlockRecordEntry = class extends Entry {
  name;
  layoutObjectHandle;
  insertionUnits;
  explodability;
  scalability;
  bitmapPreview;
  acadXData;
  get isPaperSpace() {
    return this.name.startsWith("*Paper_Space");
  }
  constructor(options) {
    super({ seeder: options.seeder, type: "BLOCK_RECORD" });
    this.name = options.name;
    this.layoutObjectHandle = options.layoutObjectHandle;
    this.insertionUnits = options.insertionUnits ?? Units.Unitless;
    this.explodability = options.explodability ?? 1;
    this.scalability = options.scalability ?? 0;
    this.acadXData = new XData("ACAD");
  }
  tagify(mg) {
    super.tagify(mg);
    mg.add(100, "AcDbBlockTableRecord");
    mg.add(2, this.name);
    mg.add(340, this.layoutObjectHandle);
    mg.add(70, this.insertionUnits);
    mg.add(280, this.explodability);
    mg.add(281, this.scalability);
    mg.add(310, this.bitmapPreview);
    this.acadXData.tagify(mg);
  }
};
var BlockRecord = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "BLOCK_RECORD" });
  }
  add(options) {
    return this.addEntry(BlockRecordEntry, options);
  }
};

// src/tables/dimstyle.ts
var DimStyleFlags = {
  None: 0,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64
};
var DimStyleEntry = class extends Entry {
  options;
  constructor(options) {
    super({ seeder: options.seeder, type: "DIMSTYLE" });
    this.hcode = 105;
    options.flags ??= DimStyleFlags.None;
    this.options = options;
  }
  tagify(mg) {
    super.tagify(mg);
    mg.add(100, "AcDbDimStyleTableRecord");
    mg.add(2, this.options.name);
    mg.add(70, this.options.flags);
    mg.add(3, this.options.DIMPOST);
    mg.add(4, this.options.DIMAPOST);
    mg.add(40, this.options.DIMSCALE);
    mg.add(41, this.options.DIMASZ);
    mg.add(42, this.options.DIMEXO);
    mg.add(43, this.options.DIMDLI);
    mg.add(44, this.options.DIMEXE);
    mg.add(45, this.options.DIMRND);
    mg.add(46, this.options.DIMDLE);
    mg.add(47, this.options.DIMTP);
    mg.add(48, this.options.DIMTM);
    mg.add(140, this.options.DIMTXT);
    mg.add(141, this.options.DIMCEN);
    mg.add(142, this.options.DIMTSZ);
    mg.add(143, this.options.DIMALTF);
    mg.add(144, this.options.DIMLFAC);
    mg.add(145, this.options.DIMTVP);
    mg.add(146, this.options.DIMTFAC);
    mg.add(147, this.options.DIMGAP);
    mg.add(148, this.options.DIMALTRND);
    mg.add(71, this.options.DIMTOL);
    mg.add(72, this.options.DIMLIM);
    mg.add(73, this.options.DIMTIH);
    mg.add(74, this.options.DIMTOH);
    mg.add(75, this.options.DIMSE1);
    mg.add(76, this.options.DIMSE2);
    mg.add(77, this.options.DIMTAD);
    mg.add(78, this.options.DIMZIN);
    mg.add(79, this.options.DIMAZIN);
    mg.add(170, this.options.DIMALT);
    mg.add(171, this.options.DIMALTD);
    mg.add(172, this.options.DIMTOFL);
    mg.add(173, this.options.DIMSAH);
    mg.add(174, this.options.DIMTIX);
    mg.add(175, this.options.DIMSOXD);
    mg.add(176, this.options.DIMCLRD);
    mg.add(177, this.options.DIMCLRE);
    mg.add(178, this.options.DIMCLRT);
    mg.add(179, this.options.DIMADEC);
    mg.add(271, this.options.DIMDEC);
    mg.add(272, this.options.DIMTDEC);
    mg.add(273, this.options.DIMALTU);
    mg.add(274, this.options.DIMALTTD);
    mg.add(275, this.options.DIMAUNIT);
    mg.add(276, this.options.DIMFRAC);
    mg.add(277, this.options.DIMLUNIT);
    mg.add(278, this.options.DIMDSEP);
    mg.add(279, this.options.DIMTMOVE);
    mg.add(280, this.options.DIMJUST);
    mg.add(281, this.options.DIMSD1);
    mg.add(282, this.options.DIMSD2);
    mg.add(283, this.options.DIMTOLJ);
    mg.add(284, this.options.DIMTZIN);
    mg.add(285, this.options.DIMALTZ);
    mg.add(286, this.options.DIMALTTZ);
    mg.add(287, this.options.DIMFIT);
    mg.add(288, this.options.DIMUPT);
    mg.add(289, this.options.DIMATFIT);
    mg.add(340, this.options.DIMTXSTY);
    mg.add(341, this.options.DIMLDRBLK);
    mg.add(342, this.options.DIMBLK);
    mg.add(343, this.options.DIMBLK1);
    mg.add(344, this.options.DIMBLK2);
    mg.add(371, this.options.DIMLWD);
    mg.add(372, this.options.DIMLWE);
  }
};
var DimStyle = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "DIMSTYLE" });
  }
  add(options) {
    return this.addEntry(DimStyleEntry, options);
  }
  tagify(mg) {
    mg.add(0, "TABLE");
    mg.add(2, this.name);
    mg.add(5, this.handle);
    this.xdictionary.tagify(mg);
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbSymbolTable");
    mg.add(70, this.entries.length);
    mg.add(100, "AcDbDimStyleTable");
    this.entries.forEach((e) => e.tagify(mg));
    mg.add(0, "ENDTAB");
  }
};

// src/tables/layer.ts
var LayerFlags = {
  None: 0,
  Frozen: 1,
  FrozenInNewViewports: 2,
  Locked: 4,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64
};
var LayerEntry = class extends Entry {
  name;
  flags;
  colorNumber;
  lineTypeName;
  lineWeight;
  plotStyleNameObjectHandle;
  materialObjectHandle;
  trueColor;
  plot;
  static layerZeroName = "0";
  constructor(options) {
    super({ seeder: options.seeder, type: "LAYER" });
    this.name = options.name;
    this.flags = options.flags ?? LayerFlags.None;
    this.colorNumber = options.colorNumber ?? Colors.White;
    this.lineTypeName = options.lineTypeName ?? LineTypes.Continuous;
    this.lineWeight = options.lineWeight;
    this.plotStyleNameObjectHandle = "0";
    this.materialObjectHandle = options.materialObjectHandle;
    this.trueColor = options.trueColor;
    this.plot = options.plot;
    if (this.name.toLocaleLowerCase() === "defpoints")
      this.plot = false;
  }
  tagify(mg) {
    super.tagify(mg);
    mg.add(100, "AcDbLayerTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.add(62, this.colorNumber);
    mg.add(420, this.trueColor);
    mg.add(6, this.lineTypeName);
    mg.add(290, onezero(this.plot));
    mg.add(370, this.lineWeight);
    mg.add(390, this.plotStyleNameObjectHandle);
    mg.add(347, this.materialObjectHandle);
  }
};
var Layer = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "LAYER" });
  }
  get(name) {
    return this.find((layer) => layer.name === name);
  }
  add(options) {
    return this.addEntry(LayerEntry, options);
  }
};

// src/tables/ltype.ts
var LTypeEntry = class extends Entry {
  name;
  flags;
  descriptive;
  elements;
  constructor(options) {
    super({ seeder: options.seeder, type: "LTYPE" });
    this.name = options.name;
    this.flags = options.flags ?? EntryCommonFlags.None;
    this.descriptive = options.descriptive || "";
    this.elements = options.elements || [];
  }
  patternLength() {
    return this.elements.reduce((prev, curr) => prev + Math.abs(curr), 0);
  }
  tagify(mg) {
    super.tagify(mg);
    mg.add(100, "AcDbLinetypeTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.add(3, this.descriptive);
    mg.add(72, 65);
    mg.add(73, this.elements.length);
    mg.add(40, this.patternLength());
    this.elements.forEach((e) => {
      mg.add(49, e);
      mg.add(74, 0);
    });
  }
};
var LType = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "LTYPE" });
  }
  add(options) {
    return this.addEntry(LTypeEntry, options);
  }
};

// src/tables/style.ts
var TEXT_ITALIC = 16777250;
var TEXT_BOLD = 33554466;
var StyleFlags = {
  None: 0,
  DescribesShape: 1,
  VerticalText: 4,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64
};
var TextGenerationFlags = {
  None: 0,
  Backward: 2,
  UpsideDown: 4
};
var StyleEntry = class extends Entry {
  name;
  flags;
  fixedTextHeight;
  widthFactor;
  obliqueAngle;
  textGenerationFlags;
  lastHeightUsed;
  primaryfontFileName;
  bigFontFileName;
  fontFamily;
  italic;
  bold;
  xdata;
  constructor(options) {
    super({ seeder: options.seeder, type: "STYLE" });
    this.name = options.name;
    this.flags = options.flags ?? StyleFlags.None;
    this.fixedTextHeight = options.fixedTextHeight ?? 0;
    this.widthFactor = options.widthFactor ?? 1;
    this.obliqueAngle = options.obliqueAngle ?? 0;
    this.textGenerationFlags = options.textGenerationFlags ?? TextGenerationFlags.None;
    this.lastHeightUsed = options.lastHeightUsed ?? 1;
    this.primaryfontFileName = options.primaryfontFileName || "txt";
    this.bigFontFileName = options.bigFontFileName || "";
    this.fontFamily = options.fontFamily;
    this.italic = options.italic;
    this.bold = options.bold;
    this.xdata = new XData("ACAD");
  }
  tagify(mg) {
    super.tagify(mg);
    mg.add(100, "AcDbTextStyleTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.add(40, this.fixedTextHeight);
    mg.add(41, this.widthFactor);
    mg.add(50, this.obliqueAngle);
    mg.add(71, this.textGenerationFlags);
    mg.add(42, this.lastHeightUsed);
    mg.add(3, this.fontFamily == null ? this.primaryfontFileName : "");
    mg.add(4, this.bigFontFileName);
    this.updateXData(), this.xdata.tagify(mg);
  }
  updateXData() {
    this.xdata.clear();
    if (this.fontFamily != null)
      this.xdata.string(this.fontFamily);
    let flags = 34;
    if (this.italic != null)
      flags |= TEXT_ITALIC;
    if (this.bold != null)
      flags |= TEXT_BOLD;
    this.xdata.long(flags);
  }
};
var Style = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "STYLE" });
  }
  add(options) {
    return this.addEntry(StyleEntry, options);
  }
};

// src/tables/vport.ts
var VPortEntry = class extends Entry {
  name;
  lowerLeft;
  upperRight;
  center;
  height;
  constructor(options) {
    super({ seeder: options.seeder, type: "VPORT" });
    this.name = options.name;
    this.lowerLeft = options.lowerLeft;
    this.upperRight = options.upperRight;
    this.center = options.center;
    this.height = options.height;
  }
  tagify(mg) {
    super.tagify(mg);
    mg.add(100, "AcDbViewportTableRecord");
    mg.add(2, this.name);
    mg.add(70, 0);
    mg.point2d(this.lowerLeft);
    mg.point2d(this.upperRight, 1);
    mg.point2d(this.center, 2);
    mg.add(40, this.height);
    mg.add(41, this.aspect());
  }
  aspect() {
    if (!this.lowerLeft || !this.upperRight)
      return 1;
    return (this.upperRight.x - this.lowerLeft.x) / (this.upperRight.y - this.lowerLeft.y);
  }
};
var VPort = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "VPORT" });
  }
  add(options) {
    return this.addEntry(VPortEntry, options);
  }
};

// src/tables/ucs.ts
var Ucs = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "UCS" });
  }
};

// src/tables/view.ts
var View = class extends XTable {
  constructor(options) {
    super({ seeder: options.seeder, name: "VIEW" });
  }
};

// src/tables/tables.ts
var Tables = class {
  seeder;
  appId;
  blockRecord;
  dimStyle;
  layer;
  ltype;
  style;
  view;
  ucs;
  vport;
  appIdAcad;
  dimStyleStandard;
  zeroLayer;
  ltypeContinous;
  styleStandard;
  vportActive;
  constructor(options) {
    this.seeder = options.seeder;
    this.appId = new AppId(this);
    this.blockRecord = new BlockRecord(this);
    this.dimStyle = new DimStyle(this);
    this.layer = new Layer(this);
    this.ltype = new LType(this);
    this.style = new Style(this);
    this.view = new View(this);
    this.ucs = new Ucs(this);
    this.vport = new VPort(this);
    this.appIdAcad = this.addAppId({ name: "ACAD" });
    this.dimStyleStandard = this.addDimStyle({ name: "Standard" });
    this.zeroLayer = this.addLayer({ name: LayerEntry.layerZeroName });
    this.addLType({ name: "ByLayer" });
    this.addLType({ name: "ByBlock" });
    this.ltypeContinous = this.addLType({
      name: "Continuous",
      descriptive: "Solid line"
    });
    this.styleStandard = this.addStyle({ name: "Standard" });
    this.dimStyleStandard.options.DIMTXSTY = this.styleStandard.handle;
    this.vportActive = this.addVPort({ name: "*Active" });
  }
  addAppId(options) {
    return this.appId.add(options);
  }
  addBlockRecord(options) {
    return this.blockRecord.add(options);
  }
  addDimStyle(options) {
    return this.dimStyle.add(options);
  }
  addLayer(options) {
    return this.layer.add(options);
  }
  addDefpointsLayer() {
    const defpoints = this.layer.get("Defpoints");
    if (defpoints != null)
      return defpoints.name;
    return this.layer.add({ name: "Defpoints", plot: false }).name;
  }
  addLType(options) {
    return this.ltype.add(options);
  }
  addStyle(options) {
    return this.style.add(options);
  }
  addVPort(options) {
    return this.vport.add(options);
  }
  tagify(mg) {
    mg.sectionStart("TABLES");
    this.appId.tagify(mg);
    this.blockRecord.tagify(mg);
    this.dimStyle.tagify(mg);
    this.ltype.tagify(mg);
    this.style.tagify(mg);
    this.layer.tagify(mg);
    this.view.tagify(mg);
    this.ucs.tagify(mg);
    this.vport.tagify(mg);
    mg.sectionEnd();
  }
};

// src/entities/mleader.ts
var MLeader = class extends Entity {
  contentScale;
  basePosition;
  textHeight;
  arrowheadSize;
  landingGap;
  textAngleType;
  textAlignmentType;
  hasSetLast;
  value;
  textNormal;
  textStyleHandle;
  textPosition;
  hasBlock;
  lastPosition;
  doglegVector;
  doglegLength;
  vertices;
  get subClassMarker() {
    return "AcDbMLeader";
  }
  constructor(options) {
    super(options);
    this._type = "MULTILEADER";
    this.contentScale = options.contentScale ?? 1;
    this.basePosition = options.basePosition;
    this.textHeight = options.textHeight ?? 0.18;
    this.arrowheadSize = options.arrowheadSize ?? 0.18;
    this.landingGap = options.landingGap ?? 0.09;
    this.textAngleType = options.textAngleType ?? 1;
    this.textAlignmentType = options.textAlignmentType ?? 6;
    this.hasSetLast = true;
    this.value = options.value;
    this.textNormal = options.textNormal || point(0, 0, 1);
    this.textPosition = options.textPosition;
    this.hasBlock = false;
    this.lastPosition = options.lastPosition;
    this.doglegVector = options.doglegVector || point(1);
    this.doglegLength = options.doglegLength ?? 0.36;
    this.vertices = options.vertices;
    if (this.basePosition == null) {
      const { x, y } = this.lastPosition;
      const sign = this.textPosition.x > x ? 1 : -1;
      this.basePosition = point(x + sign * this.doglegLength, y);
    }
  }
  tagifyChild(mg) {
    mg.add(300, "CONTEXT_DATA{");
    mg.add(40, this.contentScale);
    mg.point(this.basePosition);
    mg.add(41, this.textHeight);
    mg.add(140, this.arrowheadSize);
    mg.add(145, this.landingGap);
    mg.add(174, this.textAngleType);
    mg.add(175, this.textAlignmentType);
    mg.add(290, onezero(this.hasSetLast));
    mg.add(304, this.value);
    mg.point(this.textNormal, 1);
    mg.add(340, this.textStyleHandle);
    mg.point(this.textPosition, 2);
    mg.add(296, onezero(this.hasBlock));
    mg.add(302, "LEADER{");
    mg.add(290, 1);
    mg.add(291, 1);
    mg.point(this.lastPosition);
    mg.point(this.doglegVector, 1);
    mg.add(40, this.doglegLength);
    this.vertices.forEach((v) => {
      mg.add(304, "LEADER_LINE{");
      mg.point(v);
      mg.add(305, "}");
    });
    mg.add(303, "}");
    mg.add(301, "}");
    mg.add(170, 1);
    mg.add(172, 2);
  }
};

// src/entities/mtext.ts
var AttachmentPoint = {
  TopLeft: 1,
  TopCenter: 2,
  TopRight: 3,
  MiddleLeft: 4,
  MiddleCenter: 5,
  MiddleRight: 6,
  BottomLeft: 7,
  BottomCenter: 8,
  BottomRight: 9
};
var DrawingDirection = {
  LeftToRight: 1,
  TopToBottom: 3,
  ByStyle: 5
};
var BackgroundFillSetting = {
  Off: 0,
  Fill: 1,
  Window: 2
};
var MText = class extends Entity {
  insertionPoint;
  height;
  referenceRectangleWidth;
  attachmentPoint;
  drawingDirection;
  value;
  styleName;
  extrusion;
  directionVector;
  horizontalWidth;
  verticalHeight;
  rotation;
  lineSpacingStyle;
  lineSpacingFactor;
  backgroundFillSetting;
  backgroundTrueColor;
  backgroundColorName;
  fillBoxColor;
  backgroundFillColor;
  backgroundTransparency;
  columnsType;
  columnCount;
  columnFlowReversed;
  columnAutoHeight;
  columnWidth;
  columnGutter;
  columnHeights;
  referenceRectangleHeight;
  get subClassMarker() {
    return "AcDbMText";
  }
  constructor(options) {
    super(options);
    this._type = "MTEXT";
    this.insertionPoint = options.insertionPoint;
    this.height = options.height;
    this.referenceRectangleWidth = options.referenceRectangleWidth;
    this.referenceRectangleHeight = options.referenceRectangleHeight;
    this.attachmentPoint = options.attachmentPoint;
    this.drawingDirection = options.drawingDirection;
    this.value = options.value || "";
    this.styleName = options.styleName;
    this.extrusion = options.extrusion = extrusion();
    this.directionVector = options.directionVector;
    this.horizontalWidth = options.horizontalWidth;
    this.verticalHeight = options.verticalHeight;
    this.rotation = options.rotation;
    this.lineSpacingStyle = options.lineSpacingStyle;
    this.lineSpacingFactor = options.lineSpacingFactor;
    this.backgroundFillSetting = options.backgroundFillSetting;
    this.backgroundTrueColor = options.backgroundTrueColor;
    this.backgroundColorName = options.backgroundColorName;
    this.fillBoxColor = options.fillBoxColor;
    this.backgroundFillColor = options.backgroundFillColor;
    this.backgroundTransparency = options.backgroundTransparency;
  }
  add(options) {
    let font = "";
    let style = "";
    if (options.fontFamily)
      font += `\\f${options.fontFamily}`;
    if (options.bold)
      font += "|b1";
    if (options.italic)
      font += "|i1";
    if (options.center)
      font += "|c1";
    if (font !== "")
      font += ";";
    if (options.underline)
      style += "\\L";
    if (options.colorNumber)
      style += `\\C${options.colorNumber}`;
    if (style !== "")
      style += ";";
    this.value += `{${font}${style}${options.value}}`;
    if (options.paragraph)
      this.value += "\\P";
  }
  bbox() {
    return BBox.point(this.insertionPoint);
  }
  tagifyChild(mg) {
    mg.point(this.insertionPoint);
    mg.add(40, this.height);
    mg.add(41, this.referenceRectangleWidth);
    mg.add(46, this.referenceRectangleHeight);
    mg.add(71, this.attachmentPoint);
    mg.add(72, this.drawingDirection);
    mg.add(1, this.value);
    mg.add(7, this.styleName);
    mg.point(this.extrusion, 200);
    mg.point(this.directionVector, 1);
    mg.add(42, this.horizontalWidth);
    mg.add(43, this.verticalHeight);
    mg.add(50, this.rotation);
    mg.add(73, this.lineSpacingStyle);
    mg.add(44, this.lineSpacingFactor);
    mg.add(90, this.backgroundFillSetting);
    mg.add(420, this.backgroundTrueColor);
    mg.add(430, this.backgroundColorName);
    mg.add(45, this.fillBoxColor);
    mg.add(63, this.backgroundFillColor);
    mg.add(441, this.backgroundTransparency);
    mg.add(75, this.columnsType);
    mg.add(76, this.columnCount);
    mg.add(78, this.columnFlowReversed);
    mg.add(79, this.columnAutoHeight);
    mg.add(48, this.columnWidth);
    mg.add(49, this.columnGutter);
    this.columnHeights?.forEach((h) => mg.add(50, h));
  }
};

// src/entities/mesh.ts
var Mesh = class extends Entity {
  vertices;
  size;
  faces;
  edges;
  get subClassMarker() {
    return "AcDbSubDMesh";
  }
  constructor(options) {
    super(options);
    this._type = "MESH";
    this.vertices = options.vertices || [];
    this.size = options.size ?? 3;
    this.faces = options.faces || [];
  }
  bbox() {
    return BBox.points(this.vertices);
  }
  tagifyChild(mg) {
    mg.add(71, 2);
    mg.add(72, 0);
    mg.add(91, 0);
    mg.add(92, this.vertices.length);
    this.vertices.forEach((v) => mg.point(v));
    mg.add(93, this.faces.length * (this.size + 1));
    this.faces.forEach((f) => {
      mg.add(90, f.length);
      f.forEach((i) => mg.add(90, i));
    });
    mg.add(94, 0);
    mg.add(95, 0);
    mg.add(90, 0);
  }
};

// src/entities/point.ts
var Point = class extends Entity {
  x;
  y;
  z;
  thickness;
  extrusion;
  angleXAxis;
  get subClassMarker() {
    return "AcDbPoint";
  }
  get location() {
    return point(this.x, this.y, this.z);
  }
  constructor(options) {
    super(options);
    this._type = "POINT";
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.z = options.z ?? 0;
    this.thickness = options.thickness;
    this.extrusion = options.extrusion;
    this.angleXAxis = options.angleXAxis;
  }
  bbox() {
    return BBox.point(this.location);
  }
  tagifyChild(mg) {
    mg.point(this.location);
    mg.add(39, this.thickness);
    mg.point(this.extrusion, 200);
    mg.add(50, this.angleXAxis);
  }
};

// src/entities/vertex.ts
var VertexFlags = {
  None: 0,
  ExtraVertex: 1,
  CurveFit: 2,
  NotUsed: 4,
  SplineVertex: 8,
  SplineControlPoint: 16,
  Polyline3DVertex: 32,
  Polyline3DMesh: 64,
  PolyfaceMeshVertex: 128
};
var Vertex = class extends Entity {
  z;
  x;
  y;
  startingWidth;
  endingWidth;
  bulge;
  flags;
  tangentDirection;
  indices;
  faceRecord;
  identifier;
  get subClassMarker() {
    if (this.faceRecord)
      return "AcDbFaceRecord";
    return "AcDbVertex";
  }
  constructor(options) {
    super(options);
    this._type = "VERTEX";
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.z = options.z ?? 0;
    this.startingWidth = options.startingWidth;
    this.endingWidth = options.endingWidth;
    this.bulge = options.bulge ?? 0;
    this.flags = options.flags ?? VertexFlags.None;
    this.tangentDirection = options.tangentDirection;
    this.indices = options.indices;
    this.faceRecord = options.faceRecord;
    this.identifier = options.identifier;
  }
  vertexSubclassMarker() {
    if (this.faceRecord)
      return void 0;
    if (this.flags & VertexFlags.Polyline3DVertex) {
      return "AcDb3dPolylineVertex";
    } else if (this.flags & VertexFlags.PolyfaceMeshVertex) {
      return "AcDbPolyFaceMeshVertex";
    } else
      return "AcDb2dVertex";
  }
  tagifyChild(mg) {
    mg.add(100, this.vertexSubclassMarker());
    mg.point(this);
    mg.add(40, this.startingWidth);
    mg.add(41, this.endingWidth);
    mg.add(42, this.bulge);
    mg.add(70, this.flags);
    mg.add(50, this.tangentDirection);
    if (this.faceRecord && this.indices) {
      mg.add(71, this.indices.at(0));
      mg.add(72, this.indices.at(1));
      mg.add(73, this.indices.at(2));
      mg.add(74, this.indices.at(3));
    }
    mg.add(91, this.identifier);
  }
};

// src/entities/polyline.ts
var PolylineFlags = {
  None: 0,
  Closed: 1,
  CurveFitVertices: 2,
  SplineFitVertices: 4,
  Polyline3D: 8,
  Polygon3DMesh: 16,
  ClosedNurbs: 32,
  PolyfaceMesh: 64,
  ContinuousPattern: 128
};
var Polyline = class extends Entity {
  elevation;
  thickness;
  flags;
  startWidth;
  endWidth;
  extrusion;
  vertices;
  faces;
  seqend;
  get subClassMarker() {
    if (this.flags & PolylineFlags.Polyline3D)
      return "AcDb3dPolyline";
    if (this.flags & PolylineFlags.PolyfaceMesh)
      return "AcDbPolyFaceMesh";
    else
      return "AcDb2dPolyline";
  }
  constructor(options) {
    super(options);
    this._type = "POLYLINE";
    this.elevation = options.elevation;
    this.thickness = options.thickness;
    this.flags = options.flags || PolylineFlags.None;
    this.startWidth = options.startWidth;
    this.endWidth = options.endWidth;
    this.extrusion = options.extrusion || extrusion();
    this.vertices = options.vertices || [];
    this.faces = options.faces || [];
    this.seqend = new SeqEnd(options);
    this.seqend.ownerObjectHandle = this.handle;
  }
  add(options) {
    const v = new Vertex({ ...options, seeder: this.seeder });
    v.ownerObjectHandle = this.ownerObjectHandle;
    v.layerName = this.layerName;
    if (v.faceRecord)
      this.faces.push(v);
    else
      this.vertices.push(v);
    return v;
  }
  bbox() {
    return BBox.points(this.vertices);
  }
  tagifyChild(mg) {
    mg.point(point(0, 0, this.elevation));
    mg.add(39, this.thickness);
    mg.add(70, this.flags);
    mg.add(71, this.vertices.length);
    mg.add(72, this.faces.length);
    mg.add(40, this.startWidth);
    mg.add(41, this.endWidth);
    mg.point(this.extrusion, 200);
    this.vertices.forEach((v) => v.tagify(mg));
    this.faces.forEach((f) => f.tagify(mg));
    this.seqend.tagify(mg);
  }
};

// src/entities/ray.ts
var Ray = class extends Entity {
  start;
  unitDirectionVector;
  get subClassMarker() {
    return "AcDbRay";
  }
  constructor(options) {
    super(options);
    this._type = "RAY";
    this.start = options.start;
    this.unitDirectionVector = options.unitDirectionVector;
  }
  bbox() {
    return BBox.line(this.start, this.unitDirectionVector);
  }
  tagifyChild(mg) {
    mg.point(this.start);
    mg.point(this.unitDirectionVector, 1);
  }
};

// src/shapes/rectangle.ts
var Rectangle = class {
  options;
  constructor(options) {
    this.options = options;
    this.options.flags ??= LWPolylineFlags.None;
    this.options.flags |= LWPolylineFlags.Closed;
  }
  get lwpolylineOptions() {
    const { options, vertices } = this;
    return { ...options, vertices };
  }
  get vertices() {
    const { corner } = this.options;
    if (corner == null)
      return this._normal();
    else if (typeof corner === "number") {
      return this._rounded(corner);
    } else
      return this._chamfer(corner);
  }
  _normal() {
    const { origin, width: w, height } = this.options;
    const h = height ?? w;
    return [
      { x: origin.x, y: origin.y },
      { x: origin.x + w, y: origin.y },
      { x: origin.x + w, y: origin.y + h },
      { x: origin.x, y: origin.y + h }
    ];
  }
  _rounded(c) {
    const { origin, width: w, height } = this.options;
    const h = height ?? w;
    const b = bulge(Math.PI / 2);
    return [
      { x: origin.x + c, y: origin.y },
      { x: origin.x + w - c, y: origin.y, bulge: b },
      { x: origin.x + w, y: origin.y + c },
      { x: origin.x + w, y: origin.y + h - c, bulge: b },
      { x: origin.x + w - c, y: origin.y + h },
      { x: origin.x + c, y: origin.y + h, bulge: b },
      { x: origin.x, y: origin.y + h - c },
      { x: origin.x, y: origin.y + c, bulge: b }
    ];
  }
  _chamfer(c) {
    const { origin, width: w, height } = this.options;
    const h = height ?? w;
    return [
      { x: origin.x + c.x, y: origin.y },
      { x: origin.x + w - c.x, y: origin.y },
      { x: origin.x + w, y: origin.y + c.y },
      { x: origin.x + w, y: origin.y + h - c.y },
      { x: origin.x + w - c.x, y: origin.y + h },
      { x: origin.x + c.x, y: origin.y + h },
      { x: origin.x, y: origin.y + h - c.y },
      { x: origin.x, y: origin.y + c.y }
    ];
  }
};

// src/entities/solid.ts
var Solid = class extends Entity {
  first;
  second;
  third;
  fourth;
  thickness;
  extrusion;
  get subClassMarker() {
    return "AcDbTrace";
  }
  constructor(options) {
    super(options);
    this._type = "SOLID";
    this.first = options.first;
    this.second = options.second;
    this.third = options.third;
    this.fourth = options.fourth || this.third;
    this.thickness = options.thickness;
    this.extrusion = options.extrusion || extrusion();
  }
  bbox() {
    const { first, second, third, fourth } = this;
    return BBox.points([first, second, third, fourth]);
  }
  tagifyChild(mg) {
    mg.point(this.first);
    mg.point(this.second, 1);
    mg.point(this.third, 2);
    mg.point(this.fourth, 3);
    mg.add(39, this.thickness);
  }
};

// src/entities/spline.ts
var SplineFlags = {
  None: 0,
  Closed: 1,
  Periodic: 2,
  Rational: 4,
  Planar: 8,
  Linear: 16
};
var Spline = class extends Entity {
  normal;
  flags;
  degree;
  startTangent;
  endTangent;
  knots;
  controls;
  weights;
  fits;
  get subClassMarker() {
    return "AcDbSpline";
  }
  get clen() {
    return this.controls.length;
  }
  get flen() {
    return this.fits.length;
  }
  get klen() {
    return this.knots.length;
  }
  constructor(options) {
    super(options);
    this._type = "SPLINE";
    this.normal = options.normal;
    this.flags = options.flags ?? SplineFlags.None;
    this.degree = options.degree ?? 3;
    this.startTangent = options.startTangent;
    this.endTangent = options.endTangent;
    this.knots = options.knots || [];
    this.controls = options.controls;
    this.weights = options.weights = [];
    this.fits = options.fits || [];
    if (this.klen === 0)
      this.knots = openUniformKnots(this.clen, this.degree);
  }
  bbox() {
    return BBox.boxes([BBox.points(this.controls), BBox.points(this.fits)]);
  }
  tagifyChild(mg) {
    mg.point(this.normal, 200);
    mg.add(70, this.flags);
    mg.add(71, this.degree);
    mg.add(72, this.klen);
    mg.add(73, this.clen);
    mg.add(74, this.flen);
    mg.add(42, 1e-7);
    mg.add(43, 1e-7);
    mg.add(44, 1e-10);
    mg.point(this.startTangent, 2);
    mg.point(this.endTangent, 3);
    this.knots.forEach((k) => mg.add(40, k));
    this.weights.forEach((w) => mg.add(41, w));
    this.controls.forEach((c) => mg.point(c));
    this.fits.forEach((f) => mg.point(f, 1));
  }
};

// src/entities/table.ts
var CellType = {
  Text: 1,
  Block: 2
};
var CellAlignment = {
  TopLeft: 1,
  TopCenter: 2,
  TopRight: 3,
  MiddleLeft: 4,
  MiddleCenter: 5,
  MiddleRight: 6,
  BottomLeft: 7,
  BottomCenter: 8,
  BottomRight: 9
};
var Cell = class {
  type;
  merged;
  autofit;
  borderWidth;
  borderHeight;
  rotation;
  text;
  textHeight;
  alignment;
  constructor(options) {
    this.type = options.type || CellType.Text;
    this.merged = options.merged || false;
    this.autofit = options.autofit || false;
    this.borderWidth = options.borderWidth ?? 1;
    this.borderHeight = options.borderHeight ?? 1;
    this.rotation = options.rotation ?? 0;
    this.text = options.text;
    this.textHeight = options.textHeight;
    this.alignment = options.alignment || CellAlignment.MiddleCenter;
  }
  tagify(mg) {
    mg.add(171, this.type);
    mg.add(173, onezero(this.merged));
    mg.add(174, onezero(this.autofit));
    mg.add(175, this.borderWidth);
    mg.add(176, this.borderHeight);
    mg.add(145, this.rotation);
    mg.add(170, this.alignment);
    mg.add(91, 262177);
    mg.add(140, this.textHeight);
    mg.add(301, "CELL_VALUE");
    mg.add(90, this.text ? 4 : 0);
    mg.add(1, this.text);
    mg.add(300, "");
    mg.add(302, this.text ?? "");
    mg.add(304, "ACVALUE_END");
  }
};
var Table = class extends Entity {
  blockName;
  insertionPoint;
  rowsCount;
  columnsCount;
  horizontalDirection;
  rowsHeight;
  columnsHeight;
  cells;
  get subClassMarker() {
    return "AcDbBlockReference";
  }
  constructor(options) {
    super(options);
    this._type = "ACAD_TABLE";
    this.blockName = options.blockName;
    this.insertionPoint = options.insertionPoint;
    this.rowsCount = options.rowsCount;
    this.columnsCount = options.columnsCount;
    this.horizontalDirection = options.horizontalDirection || point(1);
    this.rowsHeight = options.rowsHeight;
    this.columnsHeight = options.columnsHeight;
    this.cells = options.cells;
  }
  add(options) {
    this.cells.push(new Cell(options));
  }
  bbox() {
    return BBox.point(this.insertionPoint);
  }
  tagifyChild(mg) {
    mg.add(2, this.blockName);
    mg.point(this.insertionPoint);
    mg.add(100, "AcDbTable");
    mg.point(this.horizontalDirection, 1);
    mg.add(91, this.rowsCount);
    mg.add(92, this.columnsCount);
    for (let i = 0; i < this.rowsCount; i++)
      mg.add(141, this.rowsHeight[i] ?? this.rowsHeight[0] ?? 1);
    for (let i = 0; i < this.columnsCount; i++)
      mg.add(142, this.columnsHeight[i] ?? this.columnsHeight[0] ?? 1);
    this.cells.forEach((cell) => cell.tagify(mg));
  }
};

// src/entities/manager.ts
var EntitiesManager = class {
  blockRecord;
  seeder;
  handle;
  entities;
  currentLayerName;
  _tableSeed = 1;
  constructor({ blockRecord, seeder }) {
    this.blockRecord = blockRecord;
    this.seeder = seeder;
    this.handle = seeder.next();
    this.entities = [];
    this.currentLayerName = LayerEntry.layerZeroName;
  }
  bbox() {
    return BBox.boxes(this.entities.map((e) => e.bbox()));
  }
  add(ctor, options) {
    const { seeder } = this;
    const instance = new ctor({ ...options, seeder });
    if (instance.changeOwner)
      instance.ownerObjectHandle = this.blockRecord.handle;
    if (instance.layerName == null)
      instance.layerName = this.currentLayerName;
    if (this.blockRecord.isPaperSpace)
      instance.inPaperSpace = true;
    this.push(instance);
    return instance;
  }
  push(entity) {
    if (entity == null)
      return;
    if (entity.layerName == null)
      entity.layerName = this.currentLayerName;
    this.entities.push(entity);
  }
  addArc(options) {
    return this.add(Arc, options);
  }
  addAttdef(options) {
    return this.add(Attdef, options);
  }
  addAttrib(options) {
    return this.add(Attrib, options);
  }
  addAlignedDim(options) {
    return this.add(AlignedDimension, options);
  }
  addAngularLinesDim(options) {
    return this.add(AngularLinesDimension, options);
  }
  addAngularPointsDim(options) {
    return this.add(AngularPointsDimension, options);
  }
  addCircle(options) {
    return this.add(Circle, options);
  }
  addDiameterDim(options) {
    return this.add(DiameterDimension, options);
  }
  addEllipse(options) {
    return this.add(Ellipse, options);
  }
  addFace(options) {
    return this.add(Face, options);
  }
  addHatch(options) {
    return this.add(Hatch, options);
  }
  addInsert(options) {
    return this.add(Insert, options);
  }
  addLeader(options) {
    return this.add(Leader, options);
  }
  addLine(options) {
    return this.add(Line, options);
  }
  addLinearDim(options) {
    return this.add(LinearDimension, options);
  }
  addLWPolyline(options) {
    return this.add(LWPolyline, options);
  }
  addMesh(options) {
    return this.add(Mesh, options);
  }
  addMLeader(options) {
    return this.add(MLeader, options);
  }
  addMText(options) {
    return this.add(MText, options);
  }
  addPoint(options) {
    return this.add(Point, options);
  }
  addPolyline(options) {
    return this.add(Polyline, options);
  }
  addRadialDim(options) {
    return this.add(RadialDimension, options);
  }
  addRectangle(options) {
    const { seeder } = this;
    const rect = new Rectangle({ ...options, seeder });
    return this.addLWPolyline(rect.lwpolylineOptions);
  }
  addRay(options) {
    return this.add(Ray, options);
  }
  addSolid(options) {
    return this.add(Solid, options);
  }
  addSpline(options) {
    return this.add(Spline, options);
  }
  addTable(options) {
    const blockName = `*T${this._tableSeed++}`;
    return this.add(Table, { blockName, ...options });
  }
  addText(options) {
    return this.add(Text, options);
  }
  tagify(mg) {
    this.entities.forEach((e) => e.tagify(mg));
  }
};

// src/blocks/block.ts
var BlockFlags = {
  None: 0,
  Anonymous: 1,
  NoAttribute: 2,
  External: 4,
  XRef: 8,
  ExternallyDependent: 16,
  ResolvedXRef: 32,
  ReferencedXRef: 64
};
var Block = class extends EntitiesManager {
  applications;
  ownerObjectHandle;
  layerName;
  name;
  flags;
  basePoint;
  secondName;
  xrefPathName;
  description;
  endblk;
  get isModelSpace() {
    return this.name.startsWith("*Model_Space");
  }
  get isPaperSpace() {
    return this.name.startsWith("*Paper_Space");
  }
  constructor(options) {
    super(options);
    this.applications = [];
    this.ownerObjectHandle = "0";
    this.layerName = options.layerName || "0";
    this.name = options.name;
    this.flags = options.flags ?? BlockFlags.None;
    this.basePoint = options.basePoint || point();
    this.secondName = options.secondName || this.name;
    this.xrefPathName = options.xrefPathName || "";
    this.description = options.description;
    this.endblk = new EndBlk(this);
  }
  addAppDefined(name) {
    const f = this.applications.find((a2) => a2.name === name);
    if (f)
      return f;
    const a = new AppDefined(name);
    this.applications.push(a);
    return a;
  }
  tagify(mg) {
    mg.add(0, "BLOCK");
    mg.add(5, this.handle);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbEntity");
    mg.add(8, this.layerName);
    mg.add(100, "AcDbBlockBegin");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.point(this.basePoint);
    mg.add(3, this.secondName);
    mg.add(1, this.xrefPathName);
    mg.add(4, this.description);
    if (!this.isModelSpace && this.name !== "*Paper_Space")
      super.tagify(mg);
    this.endblk.tagify(mg);
  }
};

// src/blocks/blocks.ts
var Blocks = class {
  tables;
  seeder;
  blocks;
  modelSpace;
  paperSpace;
  paperSpaceSeed = 0;
  constructor({ tables, seeder }) {
    this.tables = tables;
    this.seeder = seeder;
    this.blocks = [];
    this.modelSpace = this.addBlock({ name: "*Model_Space" });
    this.paperSpace = this.addBlock({ name: "*Paper_Space" });
  }
  addBlock(options) {
    const blockRecord = this.tables.addBlockRecord(options);
    const b = new Block({ ...options, ...this, blockRecord });
    b.ownerObjectHandle = blockRecord.handle;
    b.endblk.ownerObjectHandle = blockRecord.handle;
    this.blocks.push(b);
    return b;
  }
  get(name) {
    if (name == null)
      return;
    return this.blocks.find((b) => b.name === name);
  }
  addPaperSpace() {
    const name = `*Paper_Space${this.paperSpaceSeed++}`;
    return this.addBlock({ name });
  }
  tagify(mg) {
    mg.sectionStart("BLOCKS");
    this.blocks.forEach((b) => b.tagify(mg));
    mg.sectionEnd();
  }
};

// src/classes/classes.ts
var Classes = class {
  tagify(mg) {
    mg.sectionStart("CLASSES");
    mg.sectionEnd();
  }
};

// src/header/variable.ts
var Variable = class {
  constructor(name) {
    this.name = name;
    this.tags = [];
  }
  tags;
  add(code, value) {
    this.tags.push({ code, value });
    return this;
  }
  clear() {
    this.tags.length = 0;
  }
  tagify(mg) {
    if (this.tags.length > 0) {
      mg.add(9, this.name);
      this.tags.forEach((t) => mg.add(t.code, t.value));
    }
  }
};

// src/header/header.ts
var Header = class {
  seeder;
  variables;
  constructor({ seeder }) {
    this.seeder = seeder;
    this.variables = [];
    this.add("$ACADVER").add(1, "AC1021");
    this.handseed();
  }
  add(name) {
    const f = this.variables.find((v2) => v2.name === name);
    if (f)
      return f;
    const v = new Variable(name);
    this.variables.push(v);
    return v;
  }
  exists(name) {
    return this.variables.find((v) => v.name === name) != null;
  }
  tagify(mg) {
    this.handseed();
    mg.sectionStart("HEADER");
    this.variables.forEach((v) => v.tagify(mg));
    mg.sectionEnd();
  }
  handseed() {
    const handseed = this.add("$HANDSEED");
    handseed.clear();
    handseed.add(5, this.seeder.peek());
  }
};

// src/objects/object.ts
var XObject = class {
  handleSeed;
  type;
  applications;
  reactors;
  xdictionary;
  ownerObjectHandle;
  constructor({ seeder, type }) {
    this.handleSeed = seeder.next();
    this.type = type;
    this.ownerObjectHandle = "0";
    this.applications = [];
    this.reactors = this.addAppDefined("ACAD_REACTORS");
    this.xdictionary = this.addAppDefined("ACAD_XDICTIONARY");
  }
  addAppDefined(name) {
    const f = this.applications.find((a2) => a2.name === name);
    if (f)
      return f;
    const a = new AppDefined(name);
    this.applications.push(a);
    return a;
  }
  tagify(mg) {
    mg.add(0, this.type);
    mg.add(5, this.handleSeed);
    this.applications.forEach((a) => a.tagify(mg));
    mg.add(330, this.ownerObjectHandle);
  }
};

// src/objects/dictionary.ts
var DuplicateRecordFlags = {
  NotApplicable: 0,
  KeepExisting: 1,
  UseClone: 2,
  XRef$0$Name: 3,
  $0$Name: 4,
  UnmangleName: 5
};
var Dictionary = class extends XObject {
  hardOwnerFlag;
  duplicateRecordFlag;
  entries;
  constructor(handle) {
    super({ seeder: handle, type: "DICTIONARY" });
    this.duplicateRecordFlag = DuplicateRecordFlags.NotApplicable;
    this.entries = [];
  }
  add(name, handle) {
    this.entries.push({ name, handle });
  }
  tagify(mg) {
    super.tagify(mg);
    mg.add(100, "AcDbDictionary");
    mg.add(280, this.hardOwnerFlag);
    mg.add(281, this.duplicateRecordFlag);
    this.entries.forEach((e) => {
      mg.add(3, e.name);
      mg.add(350, e.handle);
    });
  }
};

// src/objects/objects.ts
var Objects = class {
  seeder;
  objects;
  root;
  constructor({ seeder }) {
    this.seeder = seeder;
    this.objects = [];
    this.root = new Dictionary(seeder);
    this.root.duplicateRecordFlag = DuplicateRecordFlags.KeepExisting;
    this.root.add("ACAD_GROUP", this.addDictionary().handleSeed);
  }
  add(obj) {
    this.objects.push(obj);
    return obj;
  }
  addDictionary() {
    const d = new Dictionary(this.seeder);
    d.ownerObjectHandle = this.root.handleSeed;
    return this.add(d);
  }
  tagify(mg) {
    mg.sectionStart("OBJECTS");
    this.root.tagify(mg);
    this.objects.forEach((o) => o.tagify(mg));
    mg.sectionEnd();
  }
};

// src/document.ts
var Document = class {
  seeder;
  header;
  classes;
  blocks;
  entities;
  tables;
  objects;
  renderer;
  units;
  get modelSpace() {
    return this.blocks.modelSpace;
  }
  get paperSpace() {
    return this.blocks.paperSpace;
  }
  constructor() {
    this.seeder = new Seeder();
    this.header = new Header(this);
    this.classes = new Classes();
    this.tables = new Tables(this);
    this.blocks = new Blocks(this);
    this.entities = new Entities(this);
    this.objects = new Objects(this);
    this.renderer = new DimensionRenderer(this);
    this.units = Units.Unitless;
  }
  setUnits(units) {
    this.units = units;
  }
  setCurrentLayerName(name) {
    this.modelSpace.currentLayerName = name;
  }
  addBlock(options) {
    return this.blocks.addBlock(options);
  }
  addPaperSpace() {
    return this.blocks.addPaperSpace();
  }
  addVariable(name) {
    return this.header.add(name);
  }
  stringify() {
    const mg = new TagsManager();
    this.fitIn();
    this.header.tagify(mg);
    this.classes.tagify(mg);
    this.tables.tagify(mg);
    this.blocks.tagify(mg);
    this.entities.tagify(mg);
    this.objects.tagify(mg);
    mg.add(0, "EOF");
    return mg.stringify();
  }
  fitIn() {
    const bbox2 = this.modelSpace.bbox();
    const center = BBox.center(bbox2);
    const height = BBox.height(bbox2);
    this.tables.vportActive.lowerLeft = point2d(bbox2.minX, bbox2.minY);
    this.tables.vportActive.upperRight = point2d(bbox2.maxX, bbox2.maxY);
    this.tables.vportActive.center = center;
    this.tables.vportActive.height = height;
  }
};

// src/writer.ts
var Writer = class {
  document;
  constructor() {
    this.document = new Document();
  }
  stringify() {
    return this.document.stringify();
  }
};
export {
  AlignedDimension,
  AngularLinesDimension,
  AngularPointsDimension,
  AppDefined,
  AppId,
  AppIdEntry,
  AppIdFlags,
  Arc,
  ArcDimension,
  AssociativityFlag,
  AttachmentPoint,
  BBox,
  BackgroundFillSetting,
  Block,
  BlockFlags,
  BlockRecord,
  BlockRecordEntry,
  Blocks,
  BoundaryPathFlag,
  Cell,
  CellAlignment,
  CellType,
  Circle,
  Classes,
  Colors,
  CreationFlag,
  DiameterDimension,
  Dictionary,
  DimAttachment,
  DimStyle,
  DimStyleEntry,
  DimStyleFlags,
  DimTextLineSpacingStyle,
  Dimension,
  DimensionArrow,
  DimensionRenderer,
  DimensionType,
  Document,
  DrawingDirection,
  DuplicateRecordFlags,
  Ellipse,
  EndBlk,
  Entities,
  EntitiesManager,
  Entity,
  Entry,
  EntryCommonFlags,
  Face,
  Hatch,
  HatchArc,
  HatchBoundaryPath,
  HatchEdgeType,
  HatchEdges,
  HatchEllipse,
  HatchGradient,
  HatchGradientType,
  HatchLine,
  HatchPattern,
  HatchPatternData,
  HatchPolyline,
  HatchStyle,
  Header,
  HooklineDirectionFlag,
  Insert,
  InvisibleEdge,
  LType,
  LTypeEntry,
  LWPolyline,
  LWPolylineFlags,
  Layer,
  LayerEntry,
  LayerFlags,
  Leader,
  Line,
  LineTypes,
  LinearDimension,
  MLeader,
  MText,
  Mesh,
  Objects,
  PathType,
  PatternType,
  Point,
  Polyline,
  PolylineFlags,
  RadialDimension,
  Ray,
  SOLID,
  Seeder,
  SeqEnd,
  Solid,
  Spline,
  SplineFlags,
  Style,
  StyleEntry,
  StyleFlags,
  StyledText,
  TEXT_BOLD,
  TEXT_ITALIC,
  Table,
  Tables,
  TagsManager,
  Text,
  TextBuilder,
  TextGenerationFlags,
  TextHorizontalJustification,
  TextVerticalJustification,
  TrueColor,
  Ucs,
  Units,
  VPort,
  VPortEntry,
  Variable,
  Vertex,
  VertexFlags,
  View,
  Writer,
  XData,
  XObject,
  XTable,
  angle,
  arrow,
  bbox,
  bulge,
  deg,
  dline,
  extrusion,
  onezero,
  openUniformKnots,
  point,
  point2d,
  polar,
  rad,
  stringByteSize,
  stringChunksSplit,
  tag,
  uniformKnots
};
//# sourceMappingURL=index.js.map