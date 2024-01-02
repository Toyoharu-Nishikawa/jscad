declare function bulge(fillet: number): number;
type chamfer_t = {
    first: number;
    second?: number;
};
type RectangleOptions = LWPolylineOptions & {
    chamfer?: chamfer_t;
    fillet?: number;
};
type rgb_t = {
    r: number;
    g: number;
    b: number;
};
type vec3_t = {
    x: number;
    y: number;
    z: number;
};
type vec2_t = {
    x: number;
    y: number;
};
/**
 * @param x The X coordinate of the point.
 * @param y The Y coordinate of the point.
 * @param z The Z coordinate of the point. By default 0.
 * @returns The vec3_t point.
 */
declare function point3d(x?: number, y?: number, z?: number): vec3_t;
/**
 * @param x The X coordinate of the point.
 * @param y The Y coordinate of the point.
 * @returns The vec2_t point.
 */
declare function point2d(x?: number, y?: number): vec2_t;
declare function rad2deg(v: number): number;
declare function deg2rad(v: number): number;

type tag_t = {
    code: number;
    value: number | string;
};
declare class Dxfier {
    readonly lines: (string | number)[];
    constructor();
    push(code: number, value?: string | number): void;
    stringify(): string;
    start(name: string): void;
    end(): void;
    variableName(name: string): void;
    type(entityType: string): void;
    primaryText(primaryText: string): void;
    name(name: string, code?: number): void;
    handle(handle: string): void;
    lineType(lineType?: string): void;
    textStyle(textStyle: string): void;
    layerName(layerName?: string): void;
    point2d(point?: vec2_t, digit?: number): void;
    point3d(point?: vec3_t, digit?: number): void;
    elevation(elevation?: number): void;
    thickness(thickness?: number): void;
    visibilty(visibilty?: boolean): void;
    colorNumber(colorNumber?: number): void;
    subclassMarker(subclassMarker?: string): void;
}

interface DxfInterface {
    dxfy(dx: Dxfier): void;
}
interface DxfTag {
    code: number;
    value: number | string;
}

declare enum LayerFlags {
    None = 0,
    Frozen = 1,
    FrozenInNewViewports = 2,
    Locked = 4,
    XRefDependent = 16,
    XRefResolved = 32
}
declare enum StyleFlags {
    None = 0,
    DescribeShape = 1,
    VerticalText = 4,
    XRefDependent = 16,
    XRefResolved = 32
}
declare enum ViewFlags {
    None = 0,
    PaperSpace = 1,
    XRefDependent = 16,
    XRefResolved = 32
}
declare class DxfRecord implements DxfInterface {
    readonly type: string;
    readonly handle: string;
    ownerObjectHandle?: string;
    constructor(type: string);
    dxfy(dx: Dxfier): void;
}

declare class DxfBlockRecord extends DxfRecord {
    readonly name: string;
    insertionUnits: number;
    explodability: number;
    scalability: number;
    layoutObject?: string;
    get isPaperSpace(): boolean;
    constructor(name: string);
    dxfy(dx: Dxfier): void;
}

declare class DxfEndBlk implements DxfInterface {
    readonly handle: string;
    ownerObjectHandle?: string;
    constructor();
    dxfy(dx: Dxfier): void;
}

declare class DxfObject implements DxfInterface {
    readonly type: string;
    readonly handle: string;
    ownerObjecthandle: string;
    constructor(type: string);
    dxfy(dx: Dxfier): void;
}

type entryObject_t = {
    name: string;
    entryObjectHandle: string;
};
declare class DxfDictionary extends DxfObject {
    readonly entries: entryObject_t[];
    hardOwnerFlag?: number;
    duplicateRecordCloningFlag: number;
    constructor();
    addEntryObject(name: string, entryObjectHandle: string): void;
    dxfy(dx: Dxfier): void;
}

declare enum ImageDefResolutionUnits {
    NoUnits = 0,
    Centimeters = 2,
    Inch = 5
}
declare class DxfImageDef extends DxfObject {
    path: string;
    acadImageDictHandle: string;
    readonly imageReactorHandles: string[];
    width: number;
    height: number;
    widthPixelSize: number;
    heightPixelSize: number;
    loaded: boolean;
    resolutionUnits: ImageDefResolutionUnits;
    constructor(path: string);
    addImageDefReactorHandle(id: string): void;
    dxfy(dx: Dxfier): void;
}

declare class DxfImageDefReactor extends DxfObject {
    classVersion: number;
    imageHandle: string;
    constructor(imageHandle: string);
    dxfy(dx: Dxfier): void;
}

declare class DxfObjectsSection implements DxfInterface {
    readonly root: DxfDictionary;
    readonly objects: DxfObject[];
    constructor();
    addObject<T extends DxfObject>(object: T): T;
    addImageDef(path: string): DxfImageDef;
    addImageDefReactor(imageHandle: string): DxfImageDefReactor;
    addDictionary(): DxfDictionary;
    addEntryToRoot(name: string, softOwner: string): void;
    dxfy(dx: Dxfier): void;
}

type boundingBox_t = {
    tl: vec3_t;
    br: vec3_t;
};
declare const createBoundingBox: (tl: vec3_t, br: vec3_t) => boundingBox_t;
declare class BoundingBox {
    static centerRadiusBBox(center: vec3_t, radius: number): boundingBox_t;
    static pointBBox(point: vec3_t): boundingBox_t;
    /**
     * @param sp The start point.
     * @param ep The end point.
     * @returns
     */
    static lineBBox(sp: vec3_t, ep: vec3_t): boundingBox_t;
    static verticesBBox(vertices: vec3_t[]): boundingBox_t;
    static boundingBox(boundingBoxes: boundingBox_t[]): boundingBox_t;
    static boundingBoxCenter(boundingBox: boundingBox_t): vec3_t;
    static boundingBoxHeight(boundingBox: boundingBox_t): number;
}

declare function aciHex(aci: number): string;

declare enum Colors {
    Red = 1,
    Green = 3,
    Cyan = 4,
    Blue = 5,
    Magenta = 6,
    White = 7,
    Black = 0,
    Yellow = 2
}
declare enum Units {
    Unitless = 0,
    Inches = 1,
    Feet = 2,
    Miles = 3,
    Millimeters = 4,
    Centimeters = 5,
    Meters = 6,
    Kilometers = 7,
    Microinches = 8,
    Mils = 9,
    Yards = 10,
    Angstroms = 11,
    Nanometers = 12,
    Microns = 13,
    Decimeters = 14,
    Decameters = 15,
    Hectometers = 16,
    Gigameters = 17,
    AstronomicalUnits = 18,
    LightYears = 19,
    Parsecs = 20,
    USSurveyFeet = 21,
    USSurveyInch = 22,
    USSurveyYard = 23,
    USSurveyMile = 24
}
declare enum LineTypes {
    Continuous = "Continuous"
}

declare class ExtendedData implements DxfInterface {
    #private;
    name: string;
    constructor(name: string);
    clear(): void;
    string(string: string): void;
    beginList(): void;
    endList(): void;
    layerName(name: string): void;
    binaryData(data: string): void;
    databaseHandle(handle: string): void;
    point(point: vec3_t): void;
    position(position: vec3_t): void;
    displacement(displacement: vec3_t): void;
    direction(direction: vec3_t): void;
    real(real: number): void;
    distance(distance: number): void;
    scale(scale: number): void;
    integer(integer: number): void;
    long(long: number): void;
    dxfy(dx: Dxfier): void;
}

declare function tag(code: number, value: number | string): DxfTag;
declare function stringByteSize(value: string): number;
declare function stringChunksSplit(value: string, length?: number): string[];

type HatchPatternData_t = {
    lineAngle: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    dashLengthItems: number[];
};
declare class HatchPattern implements DxfInterface {
    name: string;
    patternsData: HatchPatternData_t[];
    scale: number;
    set angle(angle: number);
    constructor(name: string);
    dxfy(dx: Dxfier): void;
    add(patternData: HatchPatternData_t): void;
}

declare class TrueColor {
    static fromHex(hex: string): number;
    static fromRGB(r: number, g: number, b: number): number;
}

interface CommonEntityOptions {
    trueColor?: string;
    colorNumber?: number;
    extrusion?: vec3_t;
    layerName?: string;
    visible?: boolean;
    lineType?: string;
    lineTypeScale?: number;
}
declare abstract class Entity implements DxfInterface {
    type: string;
    protected subclassMarker: string | undefined;
    ownerBlockRecord?: string;
    trueColor?: string;
    colorNumber?: number;
    inPaperSpace: boolean;
    layerName?: string;
    visible?: boolean;
    lineType?: string;
    lineTypeScale?: number;
    extrusion?: vec3_t;
    readonly handle: string;
    readonly xdatas: ExtendedData[];
    /**
     * Entity class is the base class of all enities.
     * @param type - The type of the entity example : LINE, POLYLINE, ....
     * @param subclassMarker - The subclass marker of the entity.
     * @param options - The common options of all entities.
     */
    constructor(type: string, subclassMarker?: string, options?: CommonEntityOptions);
    /**
     * Get the boundingBox of an entity.
     * @returns The boundingBox of an entity.
     */
    boundingBox(): boundingBox_t;
    addXData(name: string): ExtendedData;
    protected abstract dxfyChild(dx: Dxfier): void;
    dxfy(dx: Dxfier): void;
}

declare enum DimensionType {
    Default = 0,
    Aligned = 1,
    Angular = 2,
    Diameter = 3,
    Radius = 4,
    Angular3Point = 5,
    Ordinate = 6,
    ReferencedByThis = 32,
    OrdinateType = 64
}
declare enum AttachmentPoint {
    TopLeft = 1,
    TopCenter = 2,
    TopRight = 3,
    MiddleLeft = 4,
    MiddleCenter = 5,
    MiddleRight = 6,
    BottomLeft = 7,
    BottomCenter = 8,
    BottomRight = 9
}
declare enum TextLineSpacingStyle {
    AtLeast = 1,
    Exact = 2
}
interface DimensionOptions extends CommonEntityOptions {
    blockName?: string;
    definitionPoint?: vec3_t;
    middlePoint?: vec3_t;
    attachmentPoint?: AttachmentPoint;
    textLineSpacingStyle?: TextLineSpacingStyle;
    textLineSpacingFactor?: number;
    ActualMeasurement?: number;
    text?: string;
    rotation?: 'auto' | number;
    horizontalDirection?: number;
    styleName?: string;
}
declare abstract class Dimension extends Entity {
    blockName?: string;
    definitionPoint?: vec3_t;
    middlePoint?: vec3_t;
    protected dimensionType: DimensionType;
    attachmentPoint: AttachmentPoint;
    textLineSpacingStyle?: TextLineSpacingStyle;
    textLineSpacingFactor?: number;
    ActualMeasurement?: number;
    text?: string;
    rotation?: 'auto' | number;
    horizontalDirection?: number;
    styleName?: string;
    constructor(options?: DimensionOptions);
    protected abstract rotate(): number;
    protected dxfyChild(dx: Dxfier): void;
}

interface AlignedDimOptions extends DimensionOptions {
    insertionPoint?: vec3_t;
    offset?: number;
}
declare class AlignedDimension extends Dimension {
    insertionPoint?: vec3_t;
    fisrtPoint: vec3_t;
    secondPoint: vec3_t;
    constructor(first: vec3_t, second: vec3_t, options?: AlignedDimOptions);
    private offset;
    protected rotate(): number;
    protected dxfyChild(dx: Dxfier): void;
}

interface DLine {
    start: vec3_t;
    end: vec3_t;
}
declare class AngularDimLines extends Dimension {
    first: DLine;
    second: DLine;
    location: vec3_t;
    constructor(first: DLine, second: DLine, location: vec3_t, options?: DimensionOptions);
    protected rotate(): number;
    private _update;
    protected dxfyChild(dx: Dxfier): void;
}

declare class AngularDimPoints extends Dimension {
    center: vec3_t;
    first: vec3_t;
    second: vec3_t;
    constructor(center: vec3_t, first: vec3_t, second: vec3_t, options?: DimensionOptions);
    protected rotate(): number;
    protected dxfyChild(dx: Dxfier): void;
}

declare class ArcDimension extends Dimension {
    center: vec3_t;
    startPoint: vec3_t;
    endPoint: vec3_t;
    startAngle: number;
    endAngle: number;
    isPartial: 1 | 0;
    hasLeader: 1 | 0;
    firstLeaderPoint?: vec3_t;
    secondLeaderPoint?: vec3_t;
    constructor(center: vec3_t, startPoint: vec3_t, endPoint: vec3_t, options?: DimensionOptions);
    protected rotate(): number;
    protected dxfyChild(dx: Dxfier): void;
}

interface DiameterDimOptions extends DimensionOptions {
    leaderLength?: number;
}
declare class DiameterDimension extends Dimension {
    first: vec3_t;
    leaderLength?: number;
    constructor(first: vec3_t, second: vec3_t, options?: DiameterDimOptions);
    protected rotate(): number;
    protected dxfyChild(dx: Dxfier): void;
}

interface LinearDimOptions extends DimensionOptions {
    insertionPoint?: vec3_t;
    offset?: number;
    angle?: number;
    linearType?: number;
}
declare class LinearDimension extends Dimension {
    insertionPoint?: vec3_t;
    fisrtPoint: vec3_t;
    secondPoint: vec3_t;
    angle: number;
    linearType?: number;
    constructor(first: vec3_t, second: vec3_t, options?: LinearDimOptions);
    private offset;
    protected rotate(): number;
    protected dxfyChild(dx: Dxfier): void;
}

interface RadialDimOptions extends DimensionOptions {
    leaderLength?: number;
}
declare class RadialDimension extends Dimension {
    first: vec3_t;
    leaderLength?: number;
    constructor(first: vec3_t, second: vec3_t, options?: RadialDimOptions);
    protected rotate(): number;
    protected dxfyChild(dx: Dxfier): void;
}

declare class Arc extends Entity {
    center: vec3_t;
    radius: number;
    startAngle: number;
    endAngle: number;
    get start(): vec3_t;
    get end(): vec3_t;
    constructor(center: vec3_t, radius: number, startAngle: number, endAngle: number, options?: CommonEntityOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum TextGenerationFlags {
    None = 0,
    Backward = 2,
    UpsideDown = 4
}
declare enum TextHorizontalAlignment {
    Left = 0,
    Center = 1,
    Right = 2,
    Aligned = 3,
    Middle = 4,
    Fit = 5
}
declare enum TextVerticalAlignment {
    BaseLine = 0,
    Bottom = 1,
    Middle = 2,
    Top = 3
}
interface TextOptions extends CommonEntityOptions {
    rotation?: number;
    obliqueAngle?: number;
    generationFlags?: TextGenerationFlags;
    horizontalAlignment?: TextHorizontalAlignment;
    verticalAlignment?: TextVerticalAlignment;
    secondAlignmentPoint?: vec3_t;
    relativeXScaleFactor?: number;
}
declare class Text extends Entity {
    position: vec3_t;
    height: number;
    value: string;
    textStyle: string;
    rotation?: number;
    obliqueAngle?: number;
    generationFlags?: TextGenerationFlags;
    horizontalAlignment?: TextHorizontalAlignment;
    verticalAlignment?: TextVerticalAlignment;
    secondAlignmentPoint?: vec3_t;
    relativeXScaleFactor?: number;
    constructor(firstAlignmentPoint: vec3_t, height: number, value: string, options?: TextOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare class Attdef extends Entity {
    tag: string;
    position: vec3_t;
    height: number;
    value: string;
    textStyle: string;
    rotation?: number;
    obliqueAngle?: number;
    generationFlags?: TextGenerationFlags;
    horizontalAlignment?: TextHorizontalAlignment;
    verticalAlignment?: TextVerticalAlignment;
    secondAlignmentPoint?: vec3_t;
    relativeXScaleFactor?: number;
    constructor(firstAlignmentPoint: vec3_t, height: number, tag: string, value: string, options?: TextOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare class Attrib extends Entity {
    tag: string;
    position: vec3_t;
    height: number;
    value: string;
    textStyle: string;
    rotation?: number;
    obliqueAngle?: number;
    generationFlags?: TextGenerationFlags;
    horizontalAlignment?: TextHorizontalAlignment;
    verticalAlignment?: TextVerticalAlignment;
    secondAlignmentPoint?: vec3_t;
    relativeXScaleFactor?: number;
    constructor(firstAlignmentPoint: vec3_t, height: number, tag: string, value: string, options?: TextOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare class Circle extends Entity {
    center: vec3_t;
    radius: number;
    constructor(center: vec3_t, radius: number, options?: CommonEntityOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare class Ellipse extends Entity {
    center: vec3_t;
    endPointOfMajorAxis: vec3_t;
    ratioOfMinorAxisToMajorAxis: number;
    startParameter: number;
    endParameter: number;
    constructor(center: vec3_t, endPointOfMajorAxis: vec3_t, ratioOfMinorAxisToMajorAxis: number, startParameter: number, endParameter: number, options?: CommonEntityOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum InvisibleEdgeFlags {
    None = 0,
    First = 1,
    Second = 2,
    Third = 4,
    Fourth = 8
}
interface FaceOptions extends CommonEntityOptions {
    invisibleEdges?: InvisibleEdgeFlags;
}
declare class Face extends Entity {
    firstCorner: vec3_t;
    secondCorner: vec3_t;
    thirdCorner: vec3_t;
    fourthCorner: vec3_t;
    invisibleEdges: InvisibleEdgeFlags;
    constructor(firstCorner: vec3_t, secondCorner: vec3_t, thirdCorner: vec3_t, fourthCorner: vec3_t, options?: FaceOptions);
    setFirstEdgeVisible(visible: boolean): void;
    setSecondEdgeVisible(visible: boolean): void;
    setThirdEdgeVisible(visible: boolean): void;
    setFourthEdgeVisible(visible: boolean): void;
    setEdgesVisible(visible: boolean): void;
    private setEdgeVisible;
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum HatchPredefinedPatterns {
    SOLID = "SOLID",
    ANGLE = "ANGLE",
    ANSI31 = "ANSI31",
    ANSI32 = "ANSI32",
    ANSI33 = "ANSI33",
    ANSI34 = "ANSI34",
    ANSI35 = "ANSI35",
    ANSI36 = "ANSI36",
    ANSI37 = "ANSI37",
    ANSI38 = "ANSI38",
    AR_B816 = "AR_B816",
    AR_B816C = "AR_B816C",
    AR_B88 = "AR_B88",
    AR_BRELM = "AR_BRELM",
    AR_BRSTD = "AR_BRSTD",
    AR_CONC = "AR_CONC",
    AR_HBONE = "AR_HBONE",
    AR_PARQ1 = "AR_PARQ1",
    AR_RROOF = "AR_RROOF",
    AR_RSHKE = "AR_RSHKE",
    AR_SAND = "AR_SAND",
    BOX = "BOX",
    BRASS = "BRASS",
    BRICK = "BRICK",
    BRSTONE = "BRSTONE",
    CLAY = "CLAY",
    CORK = "CORK",
    CROSS = "CROSS",
    DASH = "DASH",
    DOLMIT = "DOLMIT",
    DOTS = "DOTS",
    EARTH = "EARTH",
    ESCHER = "ESCHER",
    FLEX = "FLEX",
    GOST_GLASS = "GOST_GLASS",
    GOST_WOOD = "GOST_WOOD",
    GOST_GROUND = "GOST_GROUND",
    GRASS = "GRASS",
    GRATE = "GRATE",
    GRAVEL = "GRAVEL",
    HEX = "HEX",
    HONEY = "HONEY",
    HOUND = "HOUND",
    INSUL = "INSUL",
    ACAD_ISO02W100 = "ACAD_ISO02W100",
    ACAD_ISO03W100 = "ACAD_ISO03W100",
    ACAD_ISO04W100 = "ACAD_ISO04W100",
    ACAD_ISO05W100 = "ACAD_ISO05W100",
    ACAD_ISO06W100 = "ACAD_ISO06W100",
    ACAD_ISO07W100 = "ACAD_ISO07W100",
    ACAD_ISO08W100 = "ACAD_ISO08W100",
    ACAD_ISO09W100 = "ACAD_ISO09W100",
    ACAD_ISO10W100 = "ACAD_ISO10W100",
    ACAD_ISO11W100 = "ACAD_ISO11W100",
    ACAD_ISO12W100 = "ACAD_ISO12W100",
    ACAD_ISO13W100 = "ACAD_ISO13W100",
    ACAD_ISO14W100 = "ACAD_ISO14W100",
    ACAD_ISO15W100 = "ACAD_ISO15W100",
    JIS_LC_20 = "JIS_LC_20",
    JIS_LC_20A = "JIS_LC_20A",
    JIS_LC_8 = "JIS_LC_8",
    JIS_LC_8A = "JIS_LC_8A",
    JIS_RC_10 = "JIS_RC_10",
    JIS_RC_15 = "JIS_RC_15",
    JIS_RC_18 = "JIS_RC_18",
    JIS_RC_30 = "JIS_RC_30",
    JIS_STN_1E = "JIS_STN_1E",
    JIS_STN_2_5 = "JIS_STN_2_5",
    JIS_WOOD = "JIS_WOOD",
    LINE = "LINE",
    MUDST = "MUDST",
    NET = "NET",
    NET3 = "NET3",
    PLAST = "PLAST",
    PLASTI = "PLASTI",
    SACNCR = "SACNCR",
    SQUARE = "SQUARE",
    STARS = "STARS",
    STEEL = "STEEL",
    SWAMP = "SWAMP",
    TRANS = "TRANS",
    TRIANG = "TRIANG",
    ZIGZAG = "ZIGZAG"
}
declare enum HatchPatternType {
    UserDefined = 0,
    Predifined = 1,
    Custom = 2
}
type HatchPolylineVertex_t = {
    x: number;
    y: number;
    bulge?: number;
};
declare function vertex(x: number, y: number, bulge?: number): HatchPolylineVertex_t;
declare class HatchPolylineBoundary implements DxfInterface {
    readonly vertices: HatchPolylineVertex_t[];
    constructor(verticies?: HatchPolylineVertex_t[]);
    add(vertex: HatchPolylineVertex_t): void;
    dxfy(dx: Dxfier): void;
}
declare enum PathTypeFlag {
    Default = 0,
    External = 1,
    Polyline = 2,
    Derived = 4,
    Textbox = 8,
    Outermost = 16
}
declare class HatchBoundaryPaths implements DxfInterface {
    pathTypeFlag: PathTypeFlag;
    polylineBoundaries: HatchPolylineBoundary[];
    edgesTypeDatas: HatchEdgesTypeData[];
    constructor();
    get length(): number;
    addPolylineBoundary(polylineBoundary: HatchPolylineBoundary): void;
    private isPolyline;
    private isEdges;
    addEdgesTypeData(edgesTypeData: HatchEdgesTypeData): void;
    dxfy(dx: Dxfier): void;
}
declare class HatchLineEdgeData implements DxfInterface {
    start: vec2_t;
    end: vec2_t;
    constructor(start: vec2_t, end: vec2_t);
    dxfy(dx: Dxfier): void;
}
declare class HatchArcEdgeData implements DxfInterface {
    center: vec2_t;
    raduis: number;
    startAngle: number;
    endAngle: number;
    isCounterClockwise: boolean;
    constructor(center: vec2_t, raduis: number, startAngle: number, endAngle: number, isCounterClockwise: boolean);
    dxfy(dx: Dxfier): void;
}
declare class HatchEdgesTypeData implements DxfInterface {
    edgesData: DxfInterface[];
    constructor();
    addLineEdgeData(start: vec2_t, end: vec2_t): void;
    addArcEdgeData(center: vec2_t, raduis: number, startAngle: number, endAngle: number, isCounterClockwise: boolean): void;
    dxfy(dx: Dxfier): void;
}
declare enum SolidFillFlag {
    SolidFill = 1,
    PatternFill = 0
}
declare enum AssociativityFlag {
    NonAssociative = 0,
    Associative = 1
}
declare enum HatchStyle {
    Normal = 0,
    Outer = 1,
    Ignore = 2
}
type HatchPatternOptions_t = {
    name: HatchPredefinedPatterns;
    angle?: number;
    scale?: number;
    double?: boolean;
};
declare enum GradientType {
    LINEAR = "LINEAR",
    CYLINDER = "CYLINDER",
    INVCYLINDER = "INVCYLINDER",
    SPHERICAL = "SPHERICAL",
    HEMISPHERICAL = "HEMISPHERICAL",
    CURVED = "CURVED",
    INVSPHERICAL = "SPHERICAL",
    INVHEMISPHERICAL = "INVHEMISPHERICAL",
    INVCURVED = "INVCURVED"
}
type HatchGradientOptions_t = {
    firstColor: number;
    secondColor?: number;
    angle?: number;
    definition?: number;
    tint?: number;
    type?: GradientType;
};
type HatchOptions_t = CommonEntityOptions & {
    elevation?: number;
};
declare function gradient(fill: HatchGradientOptions_t): HatchGradientOptions_t;
declare function pattern(fill: HatchPatternOptions_t): HatchPatternOptions_t;
declare class Hatch extends Entity {
    fill: HatchPatternOptions_t | HatchGradientOptions_t;
    elevation: number;
    readonly boundaryPath: HatchBoundaryPaths;
    private get patternName();
    private get solidFillFlag();
    constructor(boundaryPath: HatchBoundaryPaths, fill: HatchPatternOptions_t | HatchGradientOptions_t, options?: HatchOptions_t);
    private pattern;
    private gradient;
    private isPattern;
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum ImageDisplayFlags {
    ShowImage = 1,
    ShowImageWhenNotAlignedWithScreen = 2,
    UseClippingBoundary = 4,
    TransparencyIsOn = 8
}
declare enum ImageClippingType {
    Rectangular = 1,
    Polygonal = 2
}
declare enum ImageClippingStateFlag {
    Off = 0,
    On = 1
}
declare enum ImageClipModeFlag {
    Outside = 0,
    Inside = 1
}
type ImageArgs_t = {
    width: number;
    height: number;
    scale: number;
    rotation: number;
    insertionPoint: vec3_t;
    imageDefHandle: string;
};
type ImageOptions_t = CommonEntityOptions & {
    imageDisplayFlags?: ImageDisplayFlags;
    clippingStateFlag?: ImageClippingStateFlag;
    clipModeFlag?: ImageClipModeFlag;
    clippingType?: ImageClippingType;
    brightness?: number;
    contrast?: number;
    fade?: number;
    classVersion?: number;
};
declare class Image extends Entity {
    #private;
    width: number;
    height: number;
    scale: number;
    rotation: number;
    insertionPoint: vec3_t;
    imageDefHandle: string;
    imageDefReactorHandle?: string;
    imageDisplayFlags: ImageDisplayFlags;
    clippingStateFlag: ImageClippingStateFlag;
    clipModeFlag: ImageClipModeFlag;
    clippingType: ImageClippingType;
    brightness: number;
    contrast: number;
    fade: number;
    ratio: number;
    classVersion: number;
    constructor(imageArgs: ImageArgs_t, options?: ImageOptions_t);
    /**
    \*
    \* @param verticies - The clip boundary verticies.
    \* @param clippingType - The clipping boundary type.
    \*/
    setClipBoundaryVerticies(verticies: vec2_t[], clippingType: ImageClippingType): void;
    resetClipping(): void;
    private _vector;
    private _uVector;
    private _vVector;
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

interface InsertOptions extends CommonEntityOptions {
    scaleFactor?: Partial<vec3_t>;
    rotationAngle?: number;
    columnCount?: number;
    rowCount?: number;
    columnSpacing?: number;
    rowSpacing?: number;
}
declare class Insert extends Entity {
    blockName: string;
    insertionPoint: vec3_t;
    scaleFactor: Partial<vec3_t>;
    rotationAngle: number;
    columnCount: number;
    rowCount: number;
    columnSpacing: number;
    rowSpacing: number;
    attributesFollowFlag: number;
    constructor(blockName: string, insertionPoint: vec3_t, options?: InsertOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum ArrowHeadFlag {
    Disabed = 0,
    Enabled = 1
}
declare enum LeaderPathType {
    StraightLine = 0,
    Spline = 1
}
interface LeaderOptions extends CommonEntityOptions {
    flag?: ArrowHeadFlag;
    leaderPathType?: LeaderPathType;
    dimensionStyleName?: string;
}
declare class Leader extends Entity {
    flag: ArrowHeadFlag;
    leaderPathType: LeaderPathType;
    dimensionStyleName: string;
    vertices: vec3_t[];
    constructor(vertices: vec3_t[], options?: LeaderOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare class Line extends Entity {
    startPoint: vec3_t;
    endPoint: vec3_t;
    constructor(startPoint: vec3_t, endPoint: vec3_t, options?: CommonEntityOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum LWPolylineFlags {
    None = 0,
    Closed = 1,
    Plinegen = 128
}
interface LWPolylineOptions extends CommonEntityOptions {
    flags?: LWPolylineFlags;
    constantWidth?: number;
    elevation?: number;
    thickness?: number;
}
interface LWPolylineVertex {
    point: vec2_t;
    startingWidth?: number;
    endWidth?: number;
    bulge?: number;
}
declare class LWPolyline extends Entity {
    vertices: LWPolylineVertex[];
    flags: LWPolylineFlags;
    constantWidth: number;
    elevation: number;
    thickness: number;
    constructor(vertices: LWPolylineVertex[], options?: LWPolylineOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum MTextAttachmentPoint {
    TopLeft = 1,
    TopCenter = 2,
    TopRight = 3,
    MiddleLeft = 4,
    MiddleCenter = 5,
    MiddleRight = 6,
    BottomLeft = 7,
    BottomCenter = 8,
    BottomRight = 9
}
declare enum MTextDrawingDirection {
    LeftToRight = 1,
    TopToBottom = 3,
    ByStyle = 5
}
declare enum MTextLineSpacingStyle {
    AtLeast = 1,
    Exact = 2
}
interface MTextOptions extends CommonEntityOptions {
    rotation?: number;
    attachmentPoint?: MTextAttachmentPoint;
    drawingDirection?: MTextDrawingDirection;
    lineSpacingStyle?: MTextLineSpacingStyle;
    width?: number;
}
declare class MText extends Entity {
    position: vec3_t;
    height: number;
    value: string;
    textStyle: string;
    rotation?: number;
    attachmentPoint?: MTextAttachmentPoint;
    drawingDirection?: MTextDrawingDirection;
    lineSpacingStyle?: MTextLineSpacingStyle;
    width?: number;
    constructor(firstAlignmentPoint: vec3_t, height: number, value: string, options?: MTextOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare class Point extends Entity {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number, options?: CommonEntityOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum VertexFlags {
    None = 0,
    ExtraVertex = 1,
    CurveFit = 2,
    NotUsed = 4,
    SplineVertex = 8,
    SplineFrame = 16,
    Polyline3dVertex = 32,
    Polygon3dMesh = 64,
    PolyfaceMeshVertex = 128
}
interface VertexOptions extends CommonEntityOptions {
    flags?: VertexFlags;
    startingWidth?: number;
    endWidth?: number;
    bulge?: number;
}
declare class Vertex extends Entity {
    point: vec3_t;
    flags: VertexFlags;
    startingWidth?: number;
    endWidth?: number;
    bulge?: number;
    constructor(point: vec3_t, options?: VertexOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare enum PolylineFlags {
    None = 0,
    Closed = 1,
    CurveFit = 2,
    SplineFit = 4,
    Polyline3D = 8,
    PolygonMesh3D = 16,
    PolygonMeshClosed = 32,
    PolyfaceMesh = 64,
    LinetypeGenerated = 128
}
declare enum SurfaceType {
    NoSmooth = 0,
    QuadraticBSpline = 5,
    CubicBSpline = 6,
    Bezier = 8
}
interface PolylineOptions extends CommonEntityOptions {
    flags?: PolylineFlags;
    elevation?: number;
    thickness?: number;
    defaultStartWidth?: number;
    defaultEndWidth?: number;
    polygonMeshM?: number;
    polygonMeshN?: number;
    smoothSurfaceM?: number;
    smoothSurfaceN?: number;
    surfaceType?: SurfaceType;
}
interface PolylineVertex {
    point: vec3_t;
    startingWidth?: number;
    endWidth?: number;
    bulge?: number;
}
declare class Polyline extends Entity {
    vertices: Vertex[];
    elevation: number;
    thickness: number;
    flags: PolylineFlags;
    private _seqend;
    defaultStartWidth: number;
    defaultEndWidth: number;
    polygonMeshM: number;
    polygonMeshN: number;
    smoothSurfaceM: number;
    smoothSurfaceN: number;
    surfaceType: SurfaceType;
    constructor(vertices: PolylineVertex[], options?: PolylineOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare class SeqEnd extends Entity {
    protected dxfyChild(dx: Dxfier): void;
    owner: string | undefined;
    constructor();
}

declare enum SplineFlags {
    Closed = 1,
    Periodic = 2,
    Rational = 4,
    Planar = 8,
    Linear = 16
}
type SplineArgs_t = {
    controlPoints: vec3_t[];
    fitPoints?: vec3_t[];
    degreeCurve?: number;
    flags?: SplineFlags;
    knots?: number[];
    weights?: number[];
};
declare class Spline extends Entity {
    controlPoints: vec3_t[];
    degreeCurve: number;
    knots: number[];
    weights: number[];
    flags: SplineFlags;
    fitPoints: vec3_t[];
    constructor(splineArgs: SplineArgs_t, options?: CommonEntityOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

interface TableOptions extends CommonEntityOptions {
    horizontalDirectionVector: vec3_t;
    cell: Cell[];
}
declare enum CellType {
    Text = 1,
    Block = 2
}
declare enum CellMerged {
    False = 0,
    True = 1
}
declare enum CellAutoFitFlag {
    False = 0,
    True = 1
}
declare enum CellAlignment {
    TopLeft = 1,
    TopCenter = 2,
    TopRight = 3,
    MiddleLeft = 4,
    MiddleCenter = 5,
    MiddleRight = 6,
    BottomLeft = 7,
    BottomCenter = 8,
    BottomRight = 9
}
interface CellOptions extends CommonEntityOptions {
    cellType?: CellType;
    cellMerged?: boolean;
    cellAutoFitFlag?: boolean;
    cellBorderWidth?: number;
    cellBorderHeight?: number;
    cellRotationValue?: number;
    cellText: string;
    cellTextHeight: number;
    cellAlignment: CellAlignment;
}
declare class Cell {
    cellType: CellType;
    cellMerged: boolean;
    cellAutoFit: boolean;
    cellBorderWidth: number;
    cellBorderHeight: number;
    cellRotationValue: number;
    cellText?: string;
    cellTextHeight?: number;
    cellAlignment: CellAlignment;
    constructor(options: CellOptions);
    dxfy(dx: Dxfier): void;
}
declare class Table extends Entity {
    blockName: string;
    position: vec3_t;
    numberOfRows: number;
    numberOfColumn: number;
    horizontalDirectionVector: vec3_t;
    rowsHeight: number[];
    columnsHeight: number[];
    cells: Cell[];
    constructor(blockName: string, position: vec3_t, numberOfRows: number, numberOfColumn: number, rowsHeight: number[], columnsHeight: number[], options: TableOptions);
    boundingBox(): boundingBox_t;
    protected dxfyChild(dx: Dxfier): void;
}

declare abstract class EntitiesManager implements DxfInterface {
    readonly blockRecord: DxfBlockRecord;
    readonly entities: Entity[];
    readonly handle: string;
    private readonly objects;
    layerName: string;
    constructor(objects: DxfObjectsSection, blockRecord: DxfBlockRecord, layerName: string);
    dxfy(dx: Dxfier): void;
    addHatch(boundaryPath: HatchBoundaryPaths, fill: HatchPatternOptions_t | HatchGradientOptions_t, options?: HatchOptions_t): Hatch;
    addEntity<T extends Entity>(entity: T): T;
    addAttrib(firstAlignmentPoint: vec3_t, height: number, tag: string, value: string, ownerInsert: Insert, options?: TextOptions): Attrib;
    addAttdef(firstAlignmentPoint: vec3_t, height: number, tag: string, value: string, options?: TextOptions): Attdef;
    addAlignedDim(first: vec3_t, second: vec3_t, options?: AlignedDimOptions): AlignedDimension;
    addDiameterDim(first: vec3_t, second: vec3_t, options?: DiameterDimOptions): DiameterDimension;
    addRadialDim(first: vec3_t, second: vec3_t, options?: RadialDimOptions): RadialDimension;
    addLinearDim(first: vec3_t, second: vec3_t, options?: LinearDimOptions): LinearDimension;
    addAngularLinesDim(first: DLine, second: DLine, location: vec3_t, options?: DimensionOptions): AngularDimLines;
    addAngularPointsDim(center: vec3_t, first: vec3_t, second: vec3_t, options?: DimensionOptions): AngularDimPoints;
    addLine(startPoint: vec3_t, endPoint: vec3_t, options?: CommonEntityOptions): Line;
    addLeader(points: vec3_t[], options?: LeaderOptions): Leader;
    addLWPolyline(points: LWPolylineVertex[], options?: LWPolylineOptions): LWPolyline;
    addRectangle(topLeft: vec2_t, bottomRight: vec2_t, options?: RectangleOptions): LWPolyline;
    addImage(imagePath: string, name: string, insertionPoint: vec3_t, width: number, height: number, scale: number, rotation: number, options?: ImageOptions_t): Image;
    addPolyline3D(vertices: PolylineVertex[], options?: PolylineOptions): Polyline;
    addPoint(x: number, y: number, z: number, options?: CommonEntityOptions): Point;
    addCircle(center: vec3_t, radius: number, options?: CommonEntityOptions): Circle;
    addArc(center: vec3_t, radius: number, startAngle: number, endAngle: number, options?: CommonEntityOptions): Arc;
    addSpline(splineArgs: SplineArgs_t, options?: CommonEntityOptions): Spline;
    addEllipse(center: vec3_t, endPointOfMajorAxis: vec3_t, ratioOfMinorAxisToMajorAxis: number, startParameter: number, endParameter: number, options?: CommonEntityOptions): Ellipse;
    add3dFace(firstCorner: vec3_t, secondCorner: vec3_t, thirdCorner: vec3_t, fourthCorner: vec3_t, options?: FaceOptions): Face;
    addText(firstAlignementPoint: vec3_t, height: number, value: string, options?: TextOptions): Text;
    addMText(firstAlignementPoint: vec3_t, height: number, value: string, options?: MTextOptions): MText;
    addInsert(blockName: string, insertionPoint: vec3_t, options?: InsertOptions): Insert;
    addTable(blockName: string, position: vec3_t, noOfRows: number, noOfColumn: number, rowHeights: number[], columnHeights: number[], tableOptions: TableOptions): Table;
    boundingBox(): boundingBox_t;
    centerView(): vec3_t;
    viewHeight(): number;
}

declare enum BlockFlags {
    None = 0,
    AnonymousBlock = 1,
    HasNonConstantAttribute = 2,
    XRef = 4,
    XRefOverlay = 8,
    ExternallyDependent = 16,
    ResolvedXRef = 32,
    ReferencedXRef = 64
}
declare class DxfBlock extends EntitiesManager {
    readonly name: string;
    readonly endBlk: DxfEndBlk;
    ownerObjectHandle?: string;
    flags: BlockFlags;
    basePoint: vec3_t;
    xrefPathName: string;
    get isPaperSpace(): boolean;
    get isModelSpace(): boolean;
    get isModelOrPaperSpace(): boolean;
    constructor(name: string, blockRecord: DxfBlockRecord, objects: DxfObjectsSection);
    setLayerName(layerName: string): void;
    dxfy(dx: Dxfier): void;
}

declare class DxfBlocksSection implements DxfInterface {
    readonly blocks: DxfBlock[];
    readonly modelSpace: DxfBlock;
    readonly paperSpace: DxfBlock;
    readonly tables: DxfTablesSection;
    readonly objects: DxfObjectsSection;
    private paperSpaceSeed;
    constructor(tables: DxfTablesSection, objects: DxfObjectsSection);
    addBlock(name: string, objects: DxfObjectsSection, removeSpecialChars?: boolean): DxfBlock;
    addPaperSpace(): DxfBlock;
    dxfy(dx: Dxfier): void;
}

declare class DxfClassesSection implements DxfInterface {
    dxfy(dx: Dxfier): void;
}

declare class DxfEntitiesSection implements DxfInterface {
    readonly blocks: DxfBlocksSection;
    readonly modelSpace: DxfBlock;
    readonly paperSpace: DxfBlock;
    constructor(blocks: DxfBlocksSection);
    setLayerName(layerName: string): void;
    dxfy(dx: Dxfier): void;
}

/**
 * This is the type for variable values.
 * @example
 * ```js
 * const values = {
 * 	10: 350,
 * 	20: 145,
 * 	30: 0
 * }
 * // 10,20 and 30 represent the groupCodes.
 * // 350,145 and 0 represent the values.
 * ```
 */
type values_t = {
    [code: number]: number | string;
};
declare class DxfVariable implements DxfInterface {
    readonly name: string;
    values: values_t;
    constructor(name: string, values: values_t);
    dxfy(dx: Dxfier): void;
}

declare class DxfHeaderSection implements DxfInterface {
    readonly variables: DxfVariable[];
    setVariable(name: string, values: values_t): void;
    dxfy(dx: Dxfier): void;
}

declare class DxfRasterVariables extends DxfObject {
    constructor();
    dxfy(dx: Dxfier): void;
}

declare enum AppIdFlags {
    None = 0,
    XRefDependent = 16,
    XRefResolved = 32
}
declare class DxfAppId extends DxfRecord {
    name: string;
    flags: AppIdFlags;
    constructor(name: string, flags?: AppIdFlags);
    dxfy(dx: Dxfier): void;
}

declare enum DimStyleFlags {
    None = 0,
    XRefDependent = 16,
    XRefRefesolved = 32
}
declare class DxfDimStyle implements DxfInterface {
    name: string;
    flags: DimStyleFlags;
    readonly handle: string;
    ownerObjectHandle?: string;
    readonly type: string;
    DIMPOST?: string;
    DIMAPOST?: string;
    DIMSCALE?: number;
    DIMASZ?: number;
    DIMEXO?: number;
    DIMDLI?: number;
    DIMEXE?: number;
    DIMRND?: number;
    DIMDLE?: number;
    DIMTP?: number;
    DIMTM?: number;
    DIMTXT?: number;
    DIMCEN?: number;
    DIMTSZ?: number;
    DIMALTF?: number;
    DIMLFAC?: number;
    DIMTVP?: number;
    DIMTFAC?: number;
    DIMGAP?: number;
    DIMALTRND?: number;
    DIMTOL?: number;
    DIMLIM?: number;
    DIMTIH?: number;
    DIMTOH?: number;
    DIMSE1?: number;
    DIMSE2?: number;
    DIMTAD?: number;
    DIMZIN?: number;
    DIMAZIN?: number;
    DIMALT?: number;
    DIMALTD?: number;
    DIMTOFL?: number;
    DIMSAH?: number;
    DIMTIX?: number;
    DIMSOXD?: number;
    DIMCLRD?: number;
    DIMCLRE?: number;
    DIMCLRT?: number;
    DIMADEC?: number;
    DIMDEC?: number;
    DIMTDEC?: number;
    DIMALTU?: number;
    DIMALTTD?: number;
    DIMAUNIT?: number;
    DIMFRAC?: number;
    DIMLUNIT?: number;
    DIMDSEP?: number;
    DIMTMOVE?: number;
    DIMJUST?: number;
    DIMSD1?: number;
    DIMSD2?: number;
    DIMTOLJ?: number;
    DIMTZIN?: number;
    DIMALTZ?: number;
    DIMALTTZ?: number;
    DIMFIT?: number;
    DIMUPT?: number;
    DIMATFIT?: number;
    DIMTXSTY?: string;
    DIMLDRBLK?: string;
    DIMBLK?: string;
    DIMBLK1?: string;
    DIMBLK2?: string;
    DIMLWD?: number;
    DIMLWE?: number;
    constructor(name: string, flags?: DimStyleFlags);
    dxfy(dx: Dxfier): void;
}

declare class DxfLType extends DxfRecord {
    readonly name: string;
    readonly descriptive: string;
    readonly elements: number[];
    flags: number;
    constructor(name: string, descriptive: string, elements: number[], flags?: number);
    dxfy(dx: Dxfier): void;
}

declare class DxfLayer extends DxfRecord {
    static layerZeroName: string;
    readonly name: string;
    colorNumber: number;
    lineType: string;
    flags: LayerFlags;
    materialObject?: string;
    trueColor?: number;
    constructor(name: string, color: number, lineType: string, flags?: LayerFlags);
    dxfy(dx: Dxfier): void;
}

declare class DxfStyle extends DxfRecord {
    readonly name: string;
    fixedTextHeight: number;
    widthFactor: number;
    obliqueAngle: number;
    textGenerationFlag: number;
    lastHeightUsed: number;
    fontFileName: string;
    bigFontFileName: string;
    flags: StyleFlags;
    constructor(name: string, flags?: StyleFlags);
    dxfy(dx: Dxfier): void;
}

declare class DxfUcs extends DxfRecord {
    readonly name: string;
    constructor(name: string);
    dxfy(dx: Dxfier): void;
}

declare class DxfVPort extends DxfRecord {
    readonly name: string;
    viewHeight: number;
    viewCenter: [number, number];
    constructor(name: string);
    dxfy(dx: Dxfier): void;
}

type ViewArgs = {
    name: string;
    flags?: ViewFlags;
    viewHeight: number;
    viewCenter: vec2_t;
    viewWidth: number;
    viewDirection: vec3_t;
    targetPoint: vec3_t;
    lensLength: number;
    frontClipping: number;
    backClipping: number;
    twistAngle: number;
    viewMode: number;
    renderMode: number;
    isUCSAssociated: boolean;
    isCameraPlottable?: boolean;
    backgroundObjectHandle?: string;
    liveSectionObjectHandle?: string;
    visualStyleObjectHandle?: string;
};
declare class DxfView extends DxfRecord {
    name: string;
    flags: ViewFlags;
    viewHeight: number;
    viewCenter: vec2_t;
    viewWidth: number;
    viewDirection: vec3_t;
    targetPoint: vec3_t;
    lensLength: number;
    frontClipping: number;
    backClipping: number;
    twistAngle: number;
    viewMode: number;
    renderMode: number;
    isUCSAssociated: boolean;
    isCameraPlottable?: boolean;
    backgroundObjectHandle?: string;
    liveSectionObjectHandle?: string;
    visualStyleObjectHandle?: string;
    constructor(args: ViewArgs);
    dxfy(dx: Dxfier): void;
}

declare class DxfAppIdTable extends DxfTable<DxfAppId> {
    constructor();
    addAppId(name: string, flags?: AppIdFlags): DxfAppId;
}

declare class DxfBlockRecordTable extends DxfTable<DxfBlockRecord> {
    constructor();
    addBlockRecord(name: string): DxfBlockRecord;
}

declare class DxfDimStyleTable extends DxfTable<DxfDimStyle> {
    constructor();
    addDimStyle(name: string, flags?: DimStyleFlags): DxfDimStyle;
    dxfy(dx: Dxfier): void;
}

declare class DxfLTypeTable extends DxfTable<DxfLType> {
    constructor();
    exist(name: string): boolean;
    ltype(name: string): DxfLType | undefined;
    addLType(name: string, descriptive: string, elements: number[], flags?: number): DxfLType;
}

declare class DxfLayerTable extends DxfTable<DxfLayer> {
    readonly lTypeTable: DxfLTypeTable;
    constructor(lineTypeTable: DxfLTypeTable);
    addLayer(name: string, color: number, lineType: string, flags?: LayerFlags): DxfLayer;
    layer(name: string): DxfLayer | undefined;
    exist(name: string): boolean;
}

declare class DxfStyleTable extends DxfTable<DxfStyle> {
    constructor();
    addStyle(name: string, flags?: number): DxfStyle;
}

declare class DxfUcsTable extends DxfTable<DxfUcs> {
    constructor();
    addUcs(name: string): DxfUcs;
}

declare class DxfVPortTable extends DxfTable<DxfVPort> {
    constructor();
    addViewPort(name: string): DxfVPort;
}

declare class DxfViewTable extends DxfTable<DxfView> {
    constructor();
    addView(args: ViewArgs): DxfView;
}

declare abstract class DxfTable<T extends DxfRecord> implements DxfInterface {
    name: string;
    maxNumberEntries: number;
    readonly handle: string;
    ownerObjectHandle: string;
    readonly records: T[];
    constructor(name: string);
    dxfy(dx: Dxfier): void;
}

declare class DxfTablesSection implements DxfInterface {
    readonly vPortTable: DxfVPortTable;
    readonly ltypeTable: DxfLTypeTable;
    readonly layerTable: DxfLayerTable;
    readonly styleTable: DxfStyleTable;
    readonly viewTable: DxfViewTable;
    readonly ucsTable: DxfUcsTable;
    readonly appIdTable: DxfAppIdTable;
    readonly dimStyleTable: DxfDimStyleTable;
    readonly blockRecordTable: DxfBlockRecordTable;
    constructor();
    layer(name: string): DxfLayer | undefined;
    addLType(name: string, descriptive: string, elements: number[], flags?: number): DxfLType;
    addBlockRecord(name: string): DxfBlockRecord;
    addLayer(name: string, color: number, lineType: string, flags?: LayerFlags): DxfLayer;
    addStyle(name: string): DxfStyle;
    addView(args: ViewArgs): DxfView;
    addUcs(name: string): DxfUcs;
    addAppId(name: string, flags?: AppIdFlags): DxfAppId;
    addDimStyle(name: string, flags?: DimStyleFlags): DxfDimStyle;
    addVPort(name: string): DxfVPort;
    dxfy(dx: Dxfier): void;
}

declare class DxfDocument implements DxfInterface {
    readonly header: DxfHeaderSection;
    readonly classes: DxfClassesSection;
    readonly tables: DxfTablesSection;
    readonly blocks: DxfBlocksSection;
    readonly entities: DxfEntitiesSection;
    readonly objects: DxfObjectsSection;
    readonly modelSpace: DxfBlock;
    readonly paperSpace: DxfBlock;
    readonly activeVPort: DxfVPort;
    readonly styleStandard: DxfStyle;
    readonly dimStyleStandard: DxfDimStyle;
    currentLayerName: string;
    currentUnits: Units;
    constructor();
    dxfy(dx: Dxfier): void;
    addBlock(name: string): DxfBlock;
    setZeroLayerAsCurrent(): void;
    setCurrentLayerName(name: string): void;
    private _handseed;
    setUnits(units: Units): void;
    private setCLayerVariable;
    setViewCenter(center: vec3_t): void;
    stringify(): string;
}

/**
 * The base class for creating the dxf content.
 */
declare class DxfWriter {
    readonly document: DxfDocument;
    get header(): DxfHeaderSection;
    get tables(): DxfTablesSection;
    get blocks(): DxfBlocksSection;
    get entities(): DxfEntitiesSection;
    get currentLayer(): string;
    get units(): Units;
    get modelSpace(): DxfBlock;
    constructor();
    /**
     * Get the layer object by name.
     * @param name The name of the layer.
     * @returns The layer object.
     */
    layer(name: string): DxfLayer | undefined;
    /**
     * Sets the zero layer as current layer.
     */
    setZeroLayerAsCurrent(): void;
    /**
     * Add a block to the blocks tables.
     * @param name - The block name.
     * @returns The added block.
     */
    addBlock(name: string): DxfBlock;
    /**
     * Add new paper space block to the blocks tables.
     * @returns The added block.
     */
    addPaperSpace(): DxfBlock;
    /**
     * Add a header variable to the dxf if not exist.
     * If exist it will update values.
     *
     * @example
     * ```js
     * const dxf = new DxfWriter();
     * dxf.setVariable("$ANGDIR", {70: 1});
     * dxf.setVariable("$EXTMAX", {10: 500, 20: 500, 30: 0});
     * ```
     * @param name - The name of the variable. Ex: $ANGDIR, $EXTMAX, ...
     * @param values - The values corresponding to the variable.
     */
    setVariable(name: string, values: values_t): void;
    /**
     * Add a new LineType to the dxf.
     *
     * @param name - Name of the lineType.
     * @param descriptive - The descriptive of the line ex: __ __ . __ __ .
     * @param elements - An array of elements of the pattern. 📝 Need more explications 😭!
     */
    addLType(name: string, descriptive: string, elements: number[]): DxfLType;
    /**
     * Add a Dimension style.
     *
     * @param name Dimension style name
     * @returns Dimension style object
     */
    addDimStyle(name: string): DxfDimStyle;
    /**
     * Add an aligned dimension entity to the dxf.
     * @param first The first definition point for linear and angular dimensions.
     * @param second The second definition point for linear and angular dimensions.
     * @param options The options of the aligned dimension entity.
     * @returns
     */
    addAlignedDim(first: vec3_t, second: vec3_t, options?: AlignedDimOptions): AlignedDimension;
    /**
     * Add a diameter dimension entity to the dxf.
     * @param first The first definition point for diameter dimensions.
     * @param second The second definition point for diameter dimensions.
     * @param options The options of the diameter dimension entity.
     * @returns
     */
    addDiameterDim(first: vec3_t, second: vec3_t, options?: DiameterDimOptions): DiameterDimension;
    /**
     * Add a radial dimension entity to the dxf.
     * @param first The first definition point for radius dimensions.
     * @param second The second definition point for radius dimensions.
     * @param options The options of the radial dimension entity.
     * @returns
     */
    addRadialDim(first: vec3_t, second: vec3_t, options?: RadialDimOptions): RadialDimension;
    /**
     * Add a linear dimension entity to the dxf.
     * @param first The first definition point for linear and angular dimensions.
     * @param second The second definition point for linear and angular dimensions.
     * @param options The options of the radial dimension entity.
     * @returns
     */
    addLinearDim(first: vec3_t, second: vec3_t, options?: LinearDimOptions): LinearDimension;
    /**
     * Add an angular dimension entity to the dxf.
     * @param first The first extension line defined by a start and an end points.
     * @param second The second extension line defined by a start and an end points.
     * @param location The location of the dimension line arc.
     * @param options The options of the dimension.
     * @returns The added dimension entity.
     */
    addAngularLinesDim(first: DLine, second: DLine, location: vec3_t, options?: DimensionOptions): AngularDimLines;
    /**
     * Add an angular dimension entity to the dxf.
     * @param center The vertex of the angle.
     * @param first The endpoint of the first extension line.
     * @param second The endpoint of the second extension line.
     * @param options The options of the dimension.
     * @returns The added dimension entity.
     */
    /**
     * Add a Hatch entity to the dxf.
     * @param boundaryPath - The boundary paths.
     * @param fill - The fill aka solid or gradient.
     * @param options - The options of the hatch entity.
     * @returns The added hatch entity.
     */
    addHatch(boundaryPath: HatchBoundaryPaths, fill: HatchPatternOptions_t | HatchGradientOptions_t, options?: HatchOptions_t): Hatch;
    /**
     * Add a new Layer to the dxf.
     * @param name - The name of the layer.
     * @param color - The color number. See [AutoCAD Color Index](https://gohtx.com/acadcolors.php).
     * @param lineType - The lineType name.
     * @param flags - Layer standard flags (bit-coded values).
     * @returns Return the added layer.
     */
    addLayer(name: string, color: number, lineType?: string, flags?: LayerFlags): DxfLayer;
    /**
     * Set the current layer name of the dxf.
     * @param name - The layer name.
     */
    setCurrentLayerName(name: string): void;
    /**
     * Set the units of the dxf.
     *
     * @param units - The units for AutoCAD DesignCenter blocks.
     */
    setUnits(units: Units): void;
    /**
     * Add a Line entity to the dxf.
     *
     * @param startPoint - The start point of the line.
     * @param endPoint - The end point of the line.
     * @param options - The options of the line entity.
     * @returns Return the added line.
     */
    addLine(startPoint: vec3_t, endPoint: vec3_t, options?: CommonEntityOptions): Line;
    /**
     * Add a Leader entity to the dxf.
     * [Dxf Leader](https://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-396B2369-F89F-47D7-8223-8B7FB794F9F3)
     *
     * @param points - An array of points.
     * @param options - The options of the leader entity.
     *
     * @returns Returns the added leader.
     */
    addLeader(points: vec3_t[], options?: LeaderOptions): Leader;
    /**
     * Add a LWPolyline entity to the dxf.
     *
     * [Dxf Polyline](http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-ABF6B778-BE20-4B49-9B58-A94E64CEFFF3)
     *
     * The Polyline entity can represent the Rectangle and the Polygon
     * just pass the array of points and LWPolylineFlags.Closed flag.
     *
     * @param points - An array of {@link LWPolylineVertex}.
     * @param options - The options of LWPolyline entity.
     *
     * @returns Return the added lwpolyline.
     */
    addLWPolyline(points: LWPolylineVertex[], options?: LWPolylineOptions): LWPolyline;
    /**
     * Add a Rectangle as closed LWPolyline entity to the dxf.
     * In DXF Reference there is no entity called Rectangle or Polygon.
     * To represent these entities (Rectangle and Polygon) use Polyline entity (Closed).
     *
     * @param topLeft - The top left corner of the rectangle.
     * @param bottomRight - The bottom right corner of the rectangle.
     * @param options - The options to apply to the rectangle.
     * @returns Return the added lwpolyline.
     */
    addRectangle(topLeft: vec2_t, bottomRight: vec2_t, options?: RectangleOptions): LWPolyline;
    /**
     * Add a 3D Polyline entity to the dxf.
     * @param vertices - An array of points.
     * @param options - The options to apply to the polyline.
     * @returns Return the added polyline.
     */
    addPolyline3D(vertices: PolylineVertex[], options?: PolylineOptions): Polyline;
    /**
     * Add a Point entity to the dxf.
     *
     * @param x - The X coordinate of the point.
     * @param y - The Y coordinate of the point.
     * @param z - The Z coordinate of the point.
     * @param options - The options to apply to the point.
     * @returns Return the added point.
     */
    addPoint(x: number, y: number, z: number, options?: CommonEntityOptions): Point;
    /**
     * Add a Circle entity to the dxf.
     *
     * @param center - The center point of the circle.
     * @param radius - The radius of the circle.
     * @param options - The Circle entity options;
     * @returns Return the added circle.
     */
    addCircle(center: vec3_t, radius: number, options?: CommonEntityOptions): Circle;
    /**
     * Add an Arc entity to the dxf.
     *
     * @param center - The center of the arc.
     * @param radius - The radius of the arc.
     * @param startAngle - The start of the angle (beginning of arc) in degrees Anticlockwise.
     * @param endAngle - The end of the angle (end of arc) in degrees Anticlockwise.
     * Angles always start from The X-axis towards anticlockwise.
     * @param options - Arc entity options.
     * @returns Return the added arc.
     */
    addArc(center: vec3_t, radius: number, startAngle: number, endAngle: number, options?: CommonEntityOptions): Arc;
    /**
     * Add a Spline entity to the dxf. It's a NURBS.
     *
     * NURBS, Non-Uniform Rational B-Splines, are mathematical representations of 3D geometry that
     * can accurately describe any shape from a simple 2D line, circle, arc, or curve to the most
     * complex 3D organic free-form surface or solid. Because of their flexibility and accuracy,
     * NURBS models can be used in any process, from illustration and animation to manufacturing.
     *
     * For more information see : [NURBS](https://www.rhino3d.com/features/nurbs/) and
     * [Dxf Spline](http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-E1F884F8-AA90-4864-A215-3182D47A9C74)
     *
     * @param splineArgs - The Spline arguments. See {@link SplineArgs}.
     * @param options - The options of the spline entity.
     * @returns Return the added spline.
     */
    addSpline(splineArgs: SplineArgs_t, options?: CommonEntityOptions): Spline;
    /**
     * Add an Ellipse entity to the dxf.
     *
     * @param center - The center point of the ellipse.
     * @param endPointOfMajorAxis - The end point of major axis, relative to the center of the ellipse.
     * @param ratioOfMinorAxisToMajorAxis - The ratio of minor axis to major axis.
     * @param startParameter - The start parameter (this value is 0.0 for a full ellipse).
     * @param endParameter - The end parameter (this value is 2pi for a full ellipse).
     * @param options
     * @returns Return the added ellipse.
     */
    addEllipse(center: vec3_t, endPointOfMajorAxis: vec3_t, ratioOfMinorAxisToMajorAxis: number, startParameter: number, endParameter: number, options?: CommonEntityOptions): Ellipse;
    /**
     * Add an Image entity to the dxf.
     * @example
     * ```js
     * const dxf = new DxfWriter();
     * dxf.addImage(
     *    '.\\test.png', // Or the absolute path if not in the same folder.
     *    'test', // The name of the image.
     *    point3d(10, 10, 0), // The insertion point.
     *    600, // The width of the image in pixels.
     *    600, //The height of the image in pixels.
     *    1, // The scale to be applied to the image.
     *    0 //The scale to be applied to the image.
     * );
     * ```
     * @param imagePath - The path of the image.
     * @param name - The name of the image.
     * @param insertionPoint - The insertion point.
     * @param width - The width of the image in pixels.
     * @param height - The height of the image in pixels.
     * @param scale - The scale to be applied to the image.
     * @param rotation - The rotation angle (Degrees) to be applied to the image.
     * @param options
     * @returns Return the added image.
     */
    addImage(imagePath: string, name: string, insertionPoint: vec3_t, width: number, height: number, scale: number, rotation: number, options?: ImageOptions_t): Image;
    /**
     * Add a 3D Face entity to the dxf.
     *
     * @param firstCorner - The first corner of the 3d face.
     * @param secondCorner - The first corner of the 3d face.
     * @param thirdCorner - The first corner of the 3d face.
     * @param fourthCorner - The first corner of the 3d face. \
     * If you want only three corners, make this is the same as the third corner
     * @param options - The options of the 3dFace entity.
     * @returns Return the added face.
     */
    add3dFace(firstCorner: vec3_t, secondCorner: vec3_t, thirdCorner: vec3_t, fourthCorner: vec3_t, options?: FaceOptions): Face;
    /**
     * Add a text entity to the dxf.
     * @param firstAlignmentPoint - The first alignment point of the text.
     * @param height - The text height.
     * @param value - The default value (the string itself).
     * @param options - The options of the text entity.
     * @returns Return the added text.
     */
    addText(firstAlignmentPoint: vec3_t, height: number, value: string, options?: TextOptions): Text;
    /**
     * Add an attdef entity to the dxf.
     *
     * @param firstAlignmentPoint
     * @param height
     * @param tag
     * @param value
     * @param options
     */
    addAttdef(firstAlignmentPoint: vec3_t, height: number, tag: string, value: string, options?: TextOptions): Attdef;
    /**
     * Add an attrib entity to the dxf.
     * @param firstAlignmentPoint
     * @param height
     * @param tag
     * @param value
     * @param ownerInsert
     * @param options
     */
    addAttrib(firstAlignmentPoint: vec3_t, height: number, tag: string, value: string, ownerInsert: Insert, options?: TextOptions): Attrib;
    /**
     * Add a Mtext entity to the dxf.
     * @param firstAlignementPoint - The first alignment point of the Mtext.
     * @param height - The Mtext height.
     * @param value - The default value (the string itself).
     * @param options - The options of the Mtext entity.
     * @returns Return the added Mtext.
     */
    addMText(firstAlignementPoint: vec3_t, height: number, value: string, options?: MTextOptions): MText;
    /**
     * Add an insert entity to the dxf.
     *
     * @param blockName - The name of the block to insert.
     * @param insertionPoint - The point where the block is to be inserted.
     * @param options - The options of the Insert entity.
     * @returns Return the added insert.
     */
    addInsert(blockName: string, insertionPoint: vec3_t, options?: InsertOptions): Insert;
    /**
     * Add a table entity to the dxf
     *
     * @param blockName - The name of the block
     * @param position - The point where the Table is to be placed
     * @param noOfRows - The no of rows
     * @param noOfColumn - The no of columns
     * @param rowHeights - Array of row heights
     * @param columnHeights - Array of column heights
     * @param tableOptions - the option of the Table entity
     * @returns Returns the added Table
     */
    addTable(blockName: string, position: vec3_t, noOfRows: number, noOfColumn: number, rowHeights: number[], columnHeights: number[], tableOptions: TableOptions): Table;
    /**
     * Get the content of the dxf.
     *
     * @returns Return the dxf string.
     */
    stringify(): string;
}

export { AlignedDimOptions, AlignedDimension, AngularDimLines, AngularDimPoints, AppIdFlags, Arc, ArcDimension, ArrowHeadFlag, AssociativityFlag, AttachmentPoint, Attdef, Attrib, BlockFlags, BoundingBox, Cell, CellAlignment, CellAutoFitFlag, CellMerged, CellOptions, CellType, Circle, Colors, CommonEntityOptions, DLine, DiameterDimOptions, DiameterDimension, DimStyleFlags, Dimension, DimensionOptions, DimensionType, DxfAppId, DxfAppIdTable, DxfBlock, DxfBlockRecord, DxfBlockRecordTable, DxfBlocksSection, DxfClassesSection, DxfDictionary, DxfDimStyle, DxfDimStyleTable, DxfDocument, DxfEndBlk, DxfEntitiesSection, DxfHeaderSection, DxfImageDef, DxfImageDefReactor, DxfInterface, DxfLType, DxfLTypeTable, DxfLayer, DxfLayerTable, DxfObject, DxfObjectsSection, DxfRasterVariables, DxfRecord, DxfStyle, DxfStyleTable, DxfTable, DxfTablesSection, DxfTag, DxfUcs, DxfUcsTable, DxfVPort, DxfVPortTable, DxfVariable, DxfView, DxfViewTable, DxfWriter, Dxfier, Ellipse, EntitiesManager, ExtendedData, Face, FaceOptions, GradientType, Hatch, HatchArcEdgeData, HatchBoundaryPaths, HatchEdgesTypeData, HatchGradientOptions_t, HatchLineEdgeData, HatchOptions_t, HatchPattern, HatchPatternData_t, HatchPatternOptions_t, HatchPatternType, HatchPolylineBoundary, HatchPolylineVertex_t, HatchPredefinedPatterns, HatchStyle, Image, ImageArgs_t, ImageClipModeFlag, ImageClippingStateFlag, ImageClippingType, ImageDefResolutionUnits, ImageDisplayFlags, ImageOptions_t, Insert, InsertOptions, InvisibleEdgeFlags, LWPolyline, LWPolylineFlags, LWPolylineOptions, LWPolylineVertex, LayerFlags, Leader, LeaderOptions, LeaderPathType, Line, LineTypes, LinearDimOptions, LinearDimension, MText, MTextAttachmentPoint, MTextDrawingDirection, MTextLineSpacingStyle, MTextOptions, PathTypeFlag, Point, Polyline, PolylineFlags, PolylineOptions, PolylineVertex, RadialDimOptions, RadialDimension, RectangleOptions, SeqEnd, SolidFillFlag, Spline, SplineArgs_t, SplineFlags, StyleFlags, SurfaceType, Table, TableOptions, Text, TextGenerationFlags, TextHorizontalAlignment, TextLineSpacingStyle, TextOptions, TextVerticalAlignment, TrueColor, Units, Vertex, VertexFlags, VertexOptions, ViewArgs, ViewFlags, aciHex, boundingBox_t, bulge, chamfer_t, createBoundingBox, deg2rad, entryObject_t, gradient, pattern, point2d, point3d, rad2deg, rgb_t, stringByteSize, stringChunksSplit, tag, tag_t, values_t, vec2_t, vec3_t, vertex };
