
#function 

chapter 3

>the function is the primary modular unit of execution.

##Base

Objects in js enjoy certain capabilities:

+ created via literal
+ assigned to variables, array entires, and properties of other objects
+ passed as arguments to function
+ returned as values from fucntions
+ possess properties that can be dynamically created and assigned.

`Function` can do all above; and it's can be __invoked__, and that invokation is frequently discharged in an asynchronous manner.

Our responsibility is to set up handlers for the various events that occur in  browser.

Events that can occur:

+ Browser Events 
+ Network Events
+ User Events
+ Timer Events

__Asynchronous__:
Events happen at unpredictable times, and in an unpredictable order.

__callback__:
Wherever we set up a function for something eles to call at a later time, be it the browser or other code, we are setting up what is termed a __callback__.

##Declaration

function is created by using `function literal`
four parts:

+ `function` keyword
+ an optional name, which should be a js identifier.
+ a comma-separated list of parameter names enclosed in parentheses
+ body of function : a series of js statements enclose in braces

anonymous function : when a function has no name. 
All function has a property named `name`; could be a empty string.

###Scope
>variables declarations are in scope from their point of decalration to the end of the function within which they are declared, regardless of block nesting.

>Named functions are  are in scope within the function within which they are declared, regardless of block nesting.

##Invocation
###arguments
ALl function invocations are also passed two implicit parameters:`arguments` and `this`.

>The `this` parameters refers to can object that implicitly associated with the function invocation and is termed the __function context__

> What `this` parameter refers to is defined by __how it is invoked___. 

###four ways to invoke a function:
#### As a function
in which the function is invoked in a straightforward manner.
```
function ninja(){};
ninja();
var samurai = function(){};
samurai();
```
the function context is the global context(`window object`)


####As a method
whick ties the invocation to an object, enable object-oriented programming
```
var o = {};
o.what = function(){};
o.what();

```
__the function context is the object__; the object is available via `this` within the function.

#### As a constructor
in which a new object is brought into being. 
steps:
1. create a new empty object
2. this object is passed to the constructor as this, and thus becomes the constructor's function context
3. In the absence of any explicit return value, the new object is returned as constructor's value


####Via their `apply()` or `call()` methods
set `this` explicitly
+ apply : this + arguments array.
+ call : this + arguments 



