sci
======
### science library 

science library similar to scipy library of python including matrix, solver, interpolate.

Install
------

```bash
$ npm install sci
```

Usage
------

### matrix
------

#### `matrix.mulScalarVec(a, u)`

returns `array`

scalar multipulation of vector, a*u
* a : type of float , scalar 
* v : type of array , vector

#### `matrix.addVecVec(u, v)`

returns `array`

addition of two vectors,  u + v
* u : type of array , vector 
* v : type of array , vector

#### `matrix.subVecVec(u, v)`

returns `array`

subtractions of two vectors, u - v
* u : type of array , vector 
* v : type of array , vector

#### `matrix.absVec(u)`

returns `float`

absolution of vector, |u|
* u : type of array , vector 

#### `matrix.innerProductVec(u, v)`

returns `float`

inner product of two vectors, (u,v)
* u : type of array , vector 
* v : type of array , vector 

#### `matrix.transpose(A)`

returns `double array`

transpose matrix, AT
* A : type of double array , matrix 

#### `matrix.unitMat(n)`

returns `double array`

make unit matrix, E
* n : type of integer , length of unit matrix 

#### `matrix.mulScalarMat(a, A)`

returns `double array`

slacar multipulation of matrix, a*A
* a : type of float , scalar 
* A : type of double array , matrix 

#### `matrix.addMatMat(A, B)`

returns `double array`

addtion of tow matrix, A + B
* A : type of double array , matrix 
* B : type of double array , matrix 

#### `matrix.subMatMat(A, B)`

returns `double array`

subtraction of tow matrix, A - B
* A : type of double array , matrix 
* B : type of double array , matrix 

#### `matrix.mulMatMat(A, B)`

returns `double array`

multipulation of tow matrix, AB
* A : type of double array , matrix 
* B : type of double array , matrix 

#### `matrix.directSum(matrixList)`

returns `double array`

make direct sum matrix from a list of matrixes, 
* matrixList : type of array of double array , matrix list 


#### `matrix.invMat(A)`

returns `double array`

inverse matrix, invA
* A : type of double array , matrix 

#### `matrix.mulMatVec(A, u)`

returns `array`

multipulation of matrix and column vector, Av
* A : type of double array , matrix 
* v : type of double array , column vector 

### geometry
------

#### `geometry.checkCross(a1, a2, b1, b2)`

returns `boolean`

check cross of segement a1-a2 and segment b1 -b2
* a1 : type of array , [x, y] 
* a2 : type of array , [x, y]
* b1 : type of array , [x, y] 
* b2 : type of array , [x, y]

#### `geometry.getCrossPoint(a1, a2, b1, b2)`

returns `array` //[x, y]

calculate cross point of line a1 -a2 and b1 - b2
* a1 : type of array , [x, y] 
* a2 : type of array , [x, y]
* b1 : type of array , [x, y] 
* b2 : type of array , [x, y]

#### `geometry.offset(l, normalizedCubicspline)`

returns `function`

make offset curve function
* l : type of float ,  // offset length 
* normalizedCubicspline: type of function , // equal to return of interpolate.normalizedCubicspline

return function is (t) => array of float [x, y] // 0 <= t <= 1

#### `geometry.getCrossPointOfCurves(t0, t1, s0, s1, curveFuncT, curveFuncS [, maxIteration=10, tolerance=1E-5])`

returns `array` // [t, s]

get cross point of curveFuncT between t0 and t1 , and curveFuncS between s0 and s1
* t0 : type of float ,  // 0 <= t0 < t1 <=1 
* t1 : type of float ,  // 0 <= t0 < t1 <=1 
* s0 : type of float ,  // 0 <= s0 < s1 <=1 
* s1 : type of float ,  // 0 <= s0 < s1 <=1 

* curveFuncT: type of function , // (t) => [x(t), y[t]]
* curveFuncS: type of function , // (s) => [x(s), y[s]]

#### `geometry.getStrictSelfCrossPoints(curveFunc, [, N=100, tolerance=1E-5])`

returns `double array` // [[t0, s0], [t1, s1], ... , [tn, sn]]

get cross points of self curve
* curveFunc : type of function ,  // 0 <= t <=1 , (t)=> [x(t), y(t)] 
* N : type of integer ,        // devisions of curve
* tolerance : type of float ,  // iteration tolerance


### interpolate
------

#### `interpolate.linear(x, y)`

returns `function`

interpolates coordinate of y0 from coordinate of x0 by linear interpolation
* x : type of array , coordinate of x 
* y : type of array , coordinate of y

#### `interpolate.cubicspline(x, y [,a0=0, an=0, method="M",differentiation=0])`

returns `function`

interpolates coordinate of y0 from coordinate of x0 by cubic spline

a0=0, an=0, method="M" is natural cubic spline

* x : type of array , coordinate of x 
* y : type of array , coordinate of y
* a0 : type of float , start edge condition, default = 0
* an : type of float ,  end edge condition, default=0
* method: type of string , edge condition option , "M" or "m" , default = "M"
  + "m" : specify first-order differentiation at the start and end points
  + "M" : specify second-order differentiation at the start and end points

* differentiation: type of integer , differentiation , 0, 1, 2 or -1, default = 0

    + 0: spline at x0
    + 1: first differentiation of spline at x0
    + 2: second differentiation of spline at x0
    + -1: integration of spline from x0 to x1

#### `interpolate.cubicsplineLinear(x, y [,a0=0, an=0, method="M"])`

returns `function`

interpolates coordinate of y0 from coordinate of x0 by cubic spline and linear interpolate

using spline in range of x and using linear interpolate out range of x (first differentiation is continuous)

a0=0, an=0, method="M" is natural cubic spline

* x : type of array , coordinate of x 
* y : type of array , coordinate of y
* a0 : type of float , start edge condition, default = 0
* an : type of float ,  end edge condition, default=0
* method: type of string , edge condition option , "M" or "m" , default = "M"
  + "m" : specify first-order differentiation at the start and end points
  + "M" : specify second-order differentiation at the start and end points

#### `interpolate.normalizedCubicspline(list, [,cyclicFlag=false])`

returns `object`
```javascript
{
    X: "function", // (t) => x coordinate            //0<= t <=1
    Y: "function", // (t) => y coordinate            //0<= t <=1
    DX: "function", //(t) => x component of tangent  //0<= t <=1
    DY: "function", //(t) => y component of tangent  //0<= t <=1
}
```

interpolates coordinate of y0 from coordinate of x0 by cyclic cubic spline

* list : type of double array ,  [[x0, y0], [x1,y1], ..., [xn, yn]]
* cyclicFlag: type of boolean , if true: cyclic spline , if flase: non-cyclic spline

#### `interpolate.normalize(X, Y)`

returns `function`

normalize parametric X and Y function to (t) => [X(t), Y(t)]

* X : type of function ,  // (t) => X(t)
* Y : type of function ,  // (t) => Y(t)

#### `interpolate.renormalize(t0, t1, normalizedFunc)`

returns `function`

renormalize function 0 <= t <= 1   =>   function t0 <= t <= t1

* t0 : type of float ,  // initial of t   
* t1 : type of float ,  // end of t
* normalizedFunc: type of function , // (t) => [X(t), Y(t)]

#### `interpolate.bspline(x, y [,degree=3, k])`

returns `function`

interpolates coordinate of y0 from coordinate of x0 by b-spline

* x : type of array , coordinate of x 
* y : type of array , coordinate of y
* degree : type of float , degree of spline curve, default = 3
* k : type of array ,  knot vector

if k is empty, uniform knot vector will be set automatically

k.length must be equal to sum of x.length + degree +1


### solve
------

#### `solve.linEqGauss(A, v)`

returns `array`

solve simultaneous linear equations by Gauss elimination method 
* A : type of double array , coefficient matrix 
* v : type of array , constant term column vector

#### `solve.LUDecomposition(A, [pivotFlag=true])`

returns `object`
```javascript
{
    L: "double array", //lower triangular matrix
    U: "double array", //upper triangular matrix
    P: "array", //pivoting list
}
```

LU decomposition by Gauss elimination method 
* A : type of double array ,  matrix 
* pivotFlag: type of boolean, if true pivoting is allowed 

#### `solve.LUSolve(L, U, P, Va)`

returns `array`

solve simultanious linear equation of LUx = PVa and returns x
* L : type of double array ,  lower triangular matrix 
* U : type of double array ,  upper triangular matrix 
* P : type of array ,  pivoting list 
* Va : type of array ,  constant term column vector

#### `solve.modifiedCholeskyDecomposition(A)`

returns `object`
```javascript
{
    L: "double array", //lower triangular matrix
    D: "array", //diagonal component of diagonal matrix
}
```

modified Choleskey decomposition
* A : type of double array ,  matrix 

(caution) A must be symmetric matrix

#### `solve.modifiedCholeskySolve(L, D, Va)`

returns `array`

solve simultanious linear equation of LDLTx = Va and returns x
* L : type of double array ,  lower triangular matrix 
* D : type of array ,  diagonal component of diagonal matrix 
* Va: type of array ,  constant term column vector


#### `solve.lineSplitMethod(x0, f, dfdx0, maxIteration, tolerance)`

returns `objcct`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    error: "float", // the last error of convergence iteration
    count: "integer", // the last iteration count
    value: "array", //a result of comvergence method
}
```

solve nonlinear equation by line split method 
* x0 : type of float , initial value
* f : type of function , nonlinear simultaneous equation
* dfdx0: type of float, first differentiation at x0
* maxIteration: type of integer, max number of iteration
* tolerance: type of float, solver torelance of residual sum of squares


#### `solve.newtonMethod(x0, f, invJ, maxIteration, tolerance)`

returns `objcct`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    error: "float", // the last error of convergence iteration
    count: "integer", // the last iteration count
    value: "array", //a result of comvergence method
}
```

solve nonlinear simultaneous equation by Newton method 
* x0 : type of array , initial value vector 
* f : type of function , nonlinear simultaneous equation
* invJ: type of function, inverse function of Jacob matrix
* maxIteration: type of integer, max number of iteration
* tolerance: type of float, solver torelance of residual sum of squares

#### `solve.broydenMethod(x0, f, invB0, maxIteration, tolerance,relaxation)`

returns `objcct`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    error: "float", // the last error of convergence iteration
    count: "integer", // the last iteration count
    value: "array", //a result of comvergence method
}
```

solve nonlinear simultaneous equation by Broyden method 
* x0 : type of array , initial value vector 
* f : type of function , nonlinear simultaneous equation
* invB0: type of double array, initial inverse of Broyden matrix
* maxIteration: type of integer, max number of iteration
* tolerance: type of float, solver torelance of residual sum of squares
* relaxation: type of function(dx, count, x, y)

initial inverse of Broyden matrix must be suggegested in some way

you have to know general behavior of equation or calculate inverse of Jacob matrix initally

`relaxation(dx, count ,x, y)`
* dx: delta x from current x to  next x in the iteration 
* count: current count of the iteration 
* x: current x in the iteration
* y: current y in the iteration


### optimize
------

#### `optimize.gradientDescent(x0, f, dfdx0, alpha, tolerance, maxIteration)`

returns `object`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    history: "double array", // [[x0,f(x0)], [x1,f(x1)], ..., [xn, f(xn)]]
    value: "float", //the result of convergence method
}
```

solve simultaneous linear equations by Gauss elimination method 
* A : type of double array , coefficient matrix 
* v : type of array , constant term column vector

### regression
------

#### `regression.singleRegression(x, y)`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        weight: "array", // linear weight 
    }
}
```

solve single regression 
* x : type of array  
* y : type of array


#### `regression.singleRegressionLoad(parameters)`

returns `function`

makes and returns single regression function
* parameters : type of object, parameters are equal to parameters of sigleRegression  


#### `regression.linearRegression(x, y)`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        weight: "array", // linear weight 
    }
}
```

solve linear regression 
* x : type of double array  
* y : type of array


#### `regression.linearRegressionLoad(parameters)`

returns `function`

makes and returns linear regression function
* parameters : type of object, parameters are equal to parameters of linearRegression  

#### `regression.polynominalRegression(x, y, degree)`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        degree: "array", // linear weight 
        weight: "array", // linear weight 
    }
}
```

solve polynominal regression 
* x : type of double array  
* y : type of array


#### `regression.polynominalRegressionLoad(parameters)`

returns `function`

makes and returns polynominal regression function
* parameters : type of object, parameters are equal to parameters of polynominalRegression  



#### `regression.gaussKernelRegression(x, y, [beta=0.1, C=100])`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        alpha: "array", // kernel weight 
        beta: "array", // kernel parameter 
        x: "double array", // explanatory variables 
        y: "array", // objective variables
    }
}
```

solve gauss kernel regression 
* x : type of double array, explanatory variables  
* y : type of array, objective variables
* beta: type of float, kernel parameter
* C: regularization parameter, if C is null, regularization is invalid 

#### `regression.gaussKernelRegressionLoad(parameters)`

returns `function`

makes and returns gauss kernel regression function 
* parameters : type of object, parameters are equal to parameters of gaussKernelRegression  

#### `regression.SVR(x, y, [beta=0.1, C=100, epsilon=0.01,tolerance=1E-3])`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        alpha: "array", // kernel weight 
        b: "float", // threshold parameter
        beta: "array", // kernel parameter 
        x: "double array", //support vector variables 
        y: "array", // support vector variables
    }
}
```

solve support vector regression 
* x : type of double array, explanatory variables  
* y : type of array, objective variables
* beta: type of float, kernel parameter
* C: regularization parameter
* epsilon: insensive parameter
* tolerance: allowed error of KKT condition

#### `regression.SVRLoad(parameters)`

returns `function`

makes and returns support vector regression function 
* parameters : type of object, parameters are equal to parameters of SVR

### classification
------

#### `classification.SVM(x, y,[beta=0.1, C=100,tolerance=1E-3])`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        alpha: "array", // kernel weight 
        b: "float", // threshold parameter
        beta: "array", // kernel parameter 
        x: "double array", // support vector x 
        y: "array", // support vector y
    }
}
```

solve single regression 
* x : type of double array, explanatory variables  
* y : type of array, objective variables
* beta: type of float, kernel parameter
* C: regularization parameter
* tolerance: allowed error of KKT condition
 
### statistics
------

#### `statistics.variance(data)`

returns `float`

calculate variance 
* data : type of array

#### `statistics.standard(data)`

returns `float`

calculate standard
* data : type of array

#### `statistics.normalize(data, [min, max])`

returns `array`

calculate normalized data
* data : type of array
* min: type of float, if not supplied, calculate min automatically
* max: type of float, if not supplied, calculate max automatically

#### `statistics.standardize(data, [average, standard])`

returns `array`

calculate standardized data
* data : type of array
* average : type of float, if not supplied, calculate average automatically
* standard: type of float, if not supplied, calculate standard automatically

#### `statistics.reNormalize(data, min, max)`

returns `array`

calculate renormalized data
* data : type of array
* min: type of float
* max: type of float

#### `statistics.reStandardize(data, ave, std)`

returns `array`

calculate restandardized data
* data : type of array
* ave: type of float, average of data
* std: type of float, standard of data

#### `statistics.R2(x, y, f)`

returns `float`

calculate coefficient of determination R2
* data : type of array
* ave: type of float, average of data
* std: type of float, standard of data

### funcs
------

#### `funcs.sumList(a)`

returns `array`

get array of sum list , Sn = a0 + a1 + ... + an
* a : type of array


#### `funcs.getRandomInt(max)`

returns `integer`

get random integer n, 0 <= n < max 
* max : type of integer

#### `funcs.makeGaussKernel(beta)`

returns `function`

get gauss kernel function  
* beta : type of float

return function is
f = exp(-beta*|x1-x2|**2)
* x1: type of array
* x2: type of array

#### `funcs.zukofsky(x0, y0, c)`

returns `function`

zukofsky wing   
* x0 : type of float
* y0 : type of float
* c : type of float

return function is
function(p)
* p: type of float, 0<= p <= 2pi
