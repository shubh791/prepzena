// prisma/seed.js
// Rich seed data — detailed notes for all topics
// Reference: W3Schools, MDN, Python docs
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Prepzena database...");

  // Clean existing data
  await prisma.progress.deleteMany();
  await prisma.review.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.note.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.pYQ.deleteMany();

  // ─────────────────────────────────────────────────────────
  //  TOPICS
  // ─────────────────────────────────────────────────────────
  const [python, javascript, typescript, git, sql, html, css, dsa, os, dbms, reactjs, cn] =
    await Promise.all([
      prisma.topic.create({ data: { title:"Python",              slug:"python",      description:"From print() to OOP — Python from zero to interview-ready.", icon:"🐍", color:"blue",    order:1 } }),
      prisma.topic.create({ data: { title:"JavaScript",          slug:"javascript",  description:"Modern JS — ES6+, async/await, DOM and real-world patterns.", icon:"⚡", color:"amber",   order:2 } }),
      prisma.topic.create({ data: { title:"TypeScript",          slug:"typescript",  description:"Type-safe JavaScript — interfaces, generics, and advanced types.", icon:"🔷", color:"blue", order:3 } }),
      prisma.topic.create({ data: { title:"Git & GitHub",        slug:"git",         description:"Version control from init to advanced team workflows.", icon:"🌿", color:"emerald",      order:4 } }),
      prisma.topic.create({ data: { title:"SQL",                 slug:"sql",         description:"Query, join, index, and optimize relational databases.", icon:"🗄️", color:"violet",        order:5 } }),
      prisma.topic.create({ data: { title:"HTML",                slug:"html",        description:"Semantic, accessible HTML5 for modern web development.", icon:"🌐", color:"rose",          order:6 } }),
      prisma.topic.create({ data: { title:"CSS",                 slug:"css",         description:"Flexbox, Grid, animations and responsive design.", icon:"🎨", color:"violet",            order:7 } }),
      prisma.topic.create({ data: { title:"Data Structures",     slug:"dsa",         description:"Arrays, trees, graphs and core algorithm patterns.", icon:"📦", color:"teal",            order:8 } }),
      prisma.topic.create({ data: { title:"Operating Systems",   slug:"os",          description:"Processes, threads, memory management and deadlocks.", icon:"💻", color:"amber",          order:9 } }),
      prisma.topic.create({ data: { title:"DBMS",                slug:"dbms",        description:"Database design, normalization and transactions.", icon:"📊", color:"rose",              order:10 } }),
      prisma.topic.create({ data: { title:"React.js",            slug:"reactjs",     description:"Build modern UIs with components, hooks, and state management.", icon:"⚛️", color:"teal",  order:11 } }),
      prisma.topic.create({ data: { title:"Computer Networks",   slug:"cn",          description:"OSI model, TCP/IP, DNS, HTTP and network security fundamentals.", icon:"🌍", color:"indigo", order:12 } }),
    ]);

  console.log("✅ Topics created");

  // Helper function to create a note
  const note = (data) => ({ ...data });

  // ─────────────────────────────────────────────────────────
  //  PYTHON — 20 notes (4 sections × 5)
  // ─────────────────────────────────────────────────────────
  const pythonData = [
    // ── Section 1: Basics (order 1-5, UNLOCKED) ──────────
    note({ order:1, isPremium:false, readTime:8, title:"Python Basics — Variables & Data Types", slug:"python-variables", summary:"Everything about Python variables, numbers, strings and booleans.",
      content:`<h2>What is Python?</h2>
<p>Python is a beginner-friendly, high-level programming language. It reads almost like English — which makes it perfect to learn first.</p>
<p>Python is used in: web development (Django, Flask), data science (pandas, NumPy), AI/ML (TensorFlow), automation scripts, and more.</p>

<h2>Variables</h2>
<p>A variable stores a value. In Python, you don't need to declare the type — Python figures it out:</p>
<pre><code>name = "Alice"      # storing text (string)
age  = 25           # storing a whole number (integer)
gpa  = 9.5          # storing a decimal (float)
passed = True       # storing True or False (boolean)

# Print any variable
print(name)         # Alice
print(age)          # 25</code></pre>

<h2>The 4 Main Data Types</h2>
<pre><code>text   = "Hello, World!"   # str  — text in quotes
number = 42                # int  — whole number
price  = 9.99              # float — decimal number
active = True              # bool — True or False

# Check the type of any variable
print(type(text))     # &lt;class 'str'&gt;
print(type(number))   # &lt;class 'int'&gt;</code></pre>

<h2>String Tricks</h2>
<pre><code>first = "Alice"
last  = "Smith"

# Join strings
full = first + " " + last     # "Alice Smith"

# f-string (modern, recommended)
greeting = f"Hello, {first}!"  # "Hello, Alice!"
print(greeting)

# String methods
print("hello".upper())    # HELLO
print("WORLD".lower())    # world
print("  hi  ".strip())   # hi
print(len("hello"))       # 5</code></pre>

<h2>Type Conversion</h2>
<pre><code>age_text = "25"
age_num  = int(age_text)   # "25" → 25

price    = float("9.99")   # "9.99" → 9.99
as_text  = str(100)        # 100 → "100"

# Useful: input() always returns a string
user_age = int(input("Enter age: "))  # convert to int!</code></pre>

<h2>Key Takeaways</h2>
<ul>
  <li>Variables need no type declaration — Python auto-detects</li>
  <li>Use <code>f"Hello {name}!"</code> for string formatting</li>
  <li>Use <code>type(x)</code> to check any variable's type</li>
  <li>Convert between types with <code>int()</code>, <code>float()</code>, <code>str()</code></li>
</ul>` }),

    note({ order:2, isPremium:false, readTime:10, title:"Python Control Flow — if, elif, else", slug:"python-if-else", summary:"Make decisions in your code with conditionals.",
      content:`<h2>If Statements</h2>
<p>An <code>if</code> statement runs code only when a condition is true.</p>
<pre><code>age = 20

if age >= 18:
    print("You can vote!")
else:
    print("Too young to vote")</code></pre>

<h2>elif — Multiple Conditions</h2>
<pre><code>score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Grade: {grade}")  # Grade: C</code></pre>

<h2>Comparison Operators</h2>
<pre><code>x = 10
y = 20

print(x == y)   # False — equal to
print(x != y)   # True  — not equal
print(x &lt; y)    # True  — less than
print(x &gt; y)    # False — greater than
print(x &lt;= y)   # True  — less or equal
print(x &gt;= y)   # False — greater or equal</code></pre>

<h2>Logical Operators</h2>
<pre><code>age = 22
has_id = True

# and — both must be true
if age >= 18 and has_id:
    print("Entry allowed!")

# or — at least one must be true
if age < 13 or age > 65:
    print("Special discount!")

# not — reverses the condition
if not has_id:
    print("No ID found")</code></pre>

<h2>Shorthand (Ternary)</h2>
<pre><code># One-liner if/else
status = "adult" if age >= 18 else "minor"
print(status)   # adult</code></pre>` }),

    note({ order:3, isPremium:false, readTime:10, title:"Python Loops — for and while", slug:"python-loops", summary:"Repeat actions with for and while loops, plus list comprehensions.",
      content:`<h2>For Loops</h2>
<p>Use <code>for</code> to loop over any sequence — list, string, range, etc.</p>
<pre><code># Loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
# apple
# banana
# cherry

# Loop over a string
for char in "Python":
    print(char)   # P y t h o n</code></pre>

<h2>range() — Loop N Times</h2>
<pre><code>for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):   # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8 (step 2)
    print(i)</code></pre>

<h2>enumerate() — Loop with Index</h2>
<pre><code>fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry</code></pre>

<h2>While Loops</h2>
<pre><code>count = 0
while count &lt; 5:
    print(count)
    count += 1   # IMPORTANT: must update to avoid infinite loop
# 0 1 2 3 4</code></pre>

<h2>break and continue</h2>
<pre><code>for i in range(10):
    if i == 5:
        break       # stop loop completely
    if i % 2 == 0:
        continue    # skip this iteration
    print(i)
# 1 3 (only odd numbers before 5)</code></pre>

<h2>List Comprehensions — Pythonic Shortcut</h2>
<pre><code># Regular way
squares = []
for i in range(10):
    squares.append(i ** 2)

# List comprehension (same result, one line!)
squares = [i**2 for i in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With a filter
even_squares = [i**2 for i in range(10) if i % 2 == 0]
# [0, 4, 16, 36, 64]</code></pre>` }),

    note({ order:4, isPremium:false, readTime:10, title:"Python Functions — def, args, return", slug:"python-functions", summary:"Write reusable code with functions — parameters, defaults, and lambda.",
      content:`<h2>Defining a Function</h2>
<pre><code>def greet(name):
    message = f"Hello, {name}!"
    return message

result = greet("Alice")
print(result)   # Hello, Alice!</code></pre>

<h2>Default Parameters</h2>
<pre><code>def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))           # Hello, Alice!
print(greet("Bob", "Hi"))       # Hi, Bob!
print(greet(greeting="Hey", name="Carol"))  # keyword args</code></pre>

<h2>*args — Any Number of Arguments</h2>
<pre><code>def sum_all(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

print(sum_all(1, 2, 3))        # 6
print(sum_all(1, 2, 3, 4, 5))  # 15</code></pre>

<h2>**kwargs — Keyword Arguments</h2>
<pre><code>def describe_person(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

describe_person(name="Alice", age=25, city="Delhi")
# name: Alice
# age: 25
# city: Delhi</code></pre>

<h2>Lambda Functions</h2>
<pre><code># A small anonymous function
double  = lambda x: x * 2
add     = lambda x, y: x + y

print(double(5))    # 10
print(add(3, 4))    # 7

# Common with map() and filter()
nums   = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))     # [2,4,6,8,10]
evens   = list(filter(lambda x: x % 2==0, nums)) # [2,4]</code></pre>

<h2>Scope — Where Variables Live</h2>
<pre><code>x = 10  # global variable

def my_function():
    y = 20  # local variable (only inside function)
    print(x)  # can access global
    print(y)

my_function()
# print(y)  ← ERROR! y doesn't exist outside</code></pre>` }),

    note({ order:5, isPremium:false, readTime:12, title:"Python Lists & Dictionaries", slug:"python-lists-dicts", summary:"The two most important Python data structures with all their methods.",
      content:`<h2>Lists</h2>
<p>A list stores multiple items in order. Items can be any type, even mixed.</p>
<pre><code>fruits = ["apple", "banana", "cherry"]

# Access items (index starts at 0)
print(fruits[0])    # apple
print(fruits[-1])   # cherry  (last item)
print(fruits[0:2])  # ['apple', 'banana']  (slice)

# Change an item
fruits[1] = "blueberry"

# Check if item exists
print("apple" in fruits)   # True</code></pre>

<h2>List Methods</h2>
<pre><code>fruits = ["apple", "banana"]

fruits.append("cherry")    # add to end
fruits.insert(1, "mango")  # insert at position 1
fruits.remove("banana")    # remove by value
popped = fruits.pop()      # remove & return last
fruits.sort()              # sort in place
fruits.reverse()           # reverse in place
print(len(fruits))         # count items</code></pre>

<h2>Dictionaries</h2>
<p>A dictionary stores key-value pairs — like a real dictionary (word → definition).</p>
<pre><code>person = {
    "name":  "Alice",
    "age":   25,
    "city":  "Delhi",
}

# Access values
print(person["name"])           # Alice
print(person.get("email", "N/A"))  # N/A (safe access)

# Add / update
person["email"] = "alice@x.com"
person["age"]   = 26

# Delete
del person["city"]

# Check key
if "name" in person:
    print("Has name!")</code></pre>

<h2>Iterating a Dictionary</h2>
<pre><code>for key in person:
    print(key)              # prints keys

for key, value in person.items():
    print(f"{key}: {value}")  # prints pairs

print(list(person.keys()))    # ['name', 'age', ...]
print(list(person.values()))  # ['Alice', 26, ...]</code></pre>

<h2>Nested Structures</h2>
<pre><code>students = [
    {"name": "Alice", "score": 92},
    {"name": "Bob",   "score": 85},
    {"name": "Carol", "score": 78},
]

# Sort by score (descending)
students.sort(key=lambda s: s["score"], reverse=True)

# Find best student
top = max(students, key=lambda s: s["score"])
print(f"Top: {top['name']} with {top['score']}")</code></pre>` }),

    // ── Section 2: Intermediate (order 6-10, LOCKED until Section 1 quiz passed) ──
    note({ order:6, isPremium:false, readTime:8, title:"Python OOP — Classes & Objects", slug:"python-oop", summary:"Object-oriented programming — classes, instances, methods, and inheritance.",
      content:`<h2>What is OOP?</h2>
<p>OOP lets you model real-world things as objects. A <strong>class</strong> is a blueprint. An <strong>object</strong> is a specific instance of that blueprint.</p>

<h2>Creating a Class</h2>
<pre><code>class Dog:
    # Class attribute (shared by all dogs)
    species = "Canis lupus familiaris"

    # Constructor — runs when you create a Dog
    def __init__(self, name, age):
        self.name = name   # instance attribute
        self.age  = age

    # Method — a function inside a class
    def bark(self):
        return f"{self.name} says: Woof!"

    def __str__(self):
        return f"Dog(name={self.name}, age={self.age})"

# Create objects (instances)
dog1 = Dog("Rex", 3)
dog2 = Dog("Bella", 5)

print(dog1.bark())     # Rex says: Woof!
print(dog2.name)       # Bella
print(str(dog1))       # Dog(name=Rex, age=3)</code></pre>

<h2>Inheritance</h2>
<pre><code>class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement this")

class Dog(Animal):
    def speak(self):
        return f"{self.name}: Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name}: Meow!"

animals = [Dog("Rex"), Cat("Whiskers"), Dog("Buddy")]
for animal in animals:
    print(animal.speak())</code></pre>

<h2>super() — Call Parent</h2>
<pre><code>class Animal:
    def __init__(self, name, sound):
        self.name  = name
        self.sound = sound

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Woof")  # call parent __init__
        self.tricks = []

    def learn_trick(self, trick):
        self.tricks.append(trick)</code></pre>` }),

    note({ order:7, isPremium:false, readTime:8, title:"Python File Handling", slug:"python-files", summary:"Read and write files — text, CSV and JSON files in Python.",
      content:`<h2>Reading a File</h2>
<pre><code># Always use 'with' — it closes the file automatically
with open("file.txt", "r") as f:
    content = f.read()       # read everything at once
    print(content)

# Read line by line (better for large files)
with open("file.txt", "r") as f:
    for line in f:
        print(line.strip())  # .strip() removes newlines

# Read all lines as a list
with open("file.txt", "r") as f:
    lines = f.readlines()
    print(lines)  # ['line1\n', 'line2\n', ...]</code></pre>

<h2>Writing a File</h2>
<pre><code># "w" mode — creates file or OVERWRITES existing
with open("output.txt", "w") as f:
    f.write("Hello, World!\n")
    f.write("Second line\n")

# "a" mode — APPENDS to existing file
with open("log.txt", "a") as f:
    f.write("New log entry\n")</code></pre>

<h2>JSON Files</h2>
<pre><code>import json

# Write JSON
data = {"name": "Alice", "age": 25, "scores": [90, 85, 92]}
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read JSON
with open("data.json", "r") as f:
    loaded = json.load(f)

print(loaded["name"])    # Alice
print(loaded["scores"])  # [90, 85, 92]</code></pre>

<h2>Check if File Exists</h2>
<pre><code>import os

if os.path.exists("file.txt"):
    print("File found!")
else:
    print("File not found")

# Modern way with pathlib
from pathlib import Path
path = Path("file.txt")
if path.exists():
    print(path.read_text())</code></pre>` }),

    note({ order:8, isPremium:false, readTime:10, title:"Python Error Handling", slug:"python-errors", summary:"Handle errors gracefully with try/except/finally — write robust programs.",
      content:`<h2>Why Handle Errors?</h2>
<p>Errors (exceptions) crash your program. With <code>try/except</code>, you can catch them and handle gracefully instead.</p>

<h2>Basic Try/Except</h2>
<pre><code>try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"Result: {result}")
except ValueError:
    print("That wasn't a number!")
except ZeroDivisionError:
    print("Can't divide by zero!")
except Exception as e:
    print(f"Unexpected error: {e}")</code></pre>

<h2>else and finally</h2>
<pre><code>try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
else:
    print("File read successfully!")
    print(content)
finally:
    print("This ALWAYS runs — use for cleanup")
    file.close()  # close file whether error or not</code></pre>

<h2>Raising Exceptions</h2>
<pre><code>def divide(a, b):
    if b == 0:
        raise ValueError("Divisor cannot be zero!")
    return a / b

try:
    print(divide(10, 0))
except ValueError as e:
    print(f"Error: {e}")</code></pre>

<h2>Custom Exceptions</h2>
<pre><code>class InsufficientFundsError(Exception):
    def __init__(self, amount_needed):
        self.amount = amount_needed
        super().__init__(f"Need ₹{amount_needed} more")

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(amount - balance)
    return balance - amount

try:
    new_balance = withdraw(100, 150)
except InsufficientFundsError as e:
    print(f"Error: {e}")  # Error: Need ₹50 more</code></pre>` }),

    note({ order:9, isPremium:false, readTime:8, title:"Python Modules & the Standard Library", slug:"python-modules", summary:"Organize code with modules, use pip, and leverage Python's powerful standard library.",
      content:`<h2>Importing Modules</h2>
<pre><code># Import the whole module
import math
print(math.pi)          # 3.14159...
print(math.sqrt(16))    # 4.0
print(math.floor(3.7))  # 3

# Import specific functions
from math import pi, sqrt, ceil
print(pi, sqrt(9))   # 3.14159... 3.0

# Import with alias (nickname)
import numpy as np
import pandas as pd</code></pre>

<h2>Useful Standard Library Modules</h2>
<pre><code>import os         # operating system — files, paths
import sys        # system — Python version, exit
import datetime   # dates and times
import random     # random numbers
import re         # regular expressions
import json       # JSON encoding/decoding
import math       # mathematical functions
import time       # timing and sleep
from collections import Counter, defaultdict
from pathlib import Path</code></pre>

<h2>Creating Your Own Module</h2>
<pre><code># File: utils.py
def add(a, b):
    return a + b

def greet(name):
    return f"Hello, {name}!"

PROJECT_NAME = "Prepzena"

# File: main.py
from utils import add, greet, PROJECT_NAME

print(add(3, 4))           # 7
print(greet("Alice"))       # Hello, Alice!
print(PROJECT_NAME)         # Prepzena</code></pre>

<h2>Installing Packages with pip</h2>
<pre><code># Install a package
pip install requests

# Install specific version
pip install requests==2.28.0

# See what's installed
pip list

# Save all dependencies to a file
pip freeze > requirements.txt

# Install from requirements.txt (for team members)
pip install -r requirements.txt</code></pre>` }),

    note({ order:10, isPremium:false, readTime:10, title:"Python — String Methods & Formatting", slug:"python-strings", summary:"Master Python string operations — slicing, methods, f-strings, and regex basics.",
      content:`<h2>String Basics</h2>
<pre><code>text = "Hello, World!"

# Length
print(len(text))         # 13

# Access characters
print(text[0])           # H
print(text[-1])          # !
print(text[7:12])        # World (slicing)
print(text[:5])          # Hello
print(text[7:])          # World!
print(text[::-1])        # !dlroW ,olleH (reverse)</code></pre>

<h2>String Methods</h2>
<pre><code>s = "  Hello, World!  "

s.strip()        # "Hello, World!"   — remove whitespace
s.lstrip()       # "Hello, World!  " — remove left only
s.rstrip()       # "  Hello, World!" — remove right only
s.lower()        # "  hello, world!  "
s.upper()        # "  HELLO, WORLD!  "
s.title()        # "  Hello, World!  "

s.replace("World", "Python")  # "  Hello, Python!  "
s.split(", ")    # ['  Hello', 'World!  ']
", ".join(["a", "b", "c"])    # "a, b, c"

s.startswith("  H")  # True
s.endswith("!  ")    # True
s.find("World")      # 9  (index, -1 if not found)
s.count("l")         # 3</code></pre>

<h2>f-Strings — Modern Formatting</h2>
<pre><code>name  = "Alice"
score = 92.5
rank  = 1

# Basic
print(f"Hello, {name}!")

# Expressions inside {}
print(f"Score: {score:.1f}%")     # Score: 92.5%
print(f"Doubled: {score * 2}")    # Doubled: 185.0

# Formatting numbers
price = 1234567.89
print(f"Price: {price:,.2f}")     # Price: 1,234,567.89
print(f"Rank: {rank:03d}")        # Rank: 001 (zero-padded)</code></pre>

<h2>Check String Content</h2>
<pre><code>"hello123".isalnum()   # True  — letters or digits only
"hello".isalpha()      # True  — letters only
"123".isdigit()        # True  — digits only
"  ".isspace()         # True  — whitespace only
"Hello".istitle()      # True  — title case</code></pre>` }),

    // ── Section 3: Advanced (order 11-15, LOCKED until Section 2 done) ──
    note({ order:11, isPremium:false, readTime:12, title:"Python Decorators", slug:"python-decorators", summary:"Modify function behaviour with decorators — the @ syntax explained clearly.",
      content:`<h2>What is a Decorator?</h2>
<p>A decorator wraps a function to add extra behavior — without changing the original function's code. Used with the <code>@</code> syntax.</p>

<h2>Simple Decorator</h2>
<pre><code>def shout(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()  # modify the result
    return wrapper

@shout
def greet(name):
    return f"hello, {name}"

print(greet("alice"))  # HELLO, ALICE</code></pre>

<h2>Timer Decorator</h2>
<pre><code>import time
from functools import wraps

def timer(func):
    @wraps(func)  # preserves original function's name/docs
    def wrapper(*args, **kwargs):
        start  = time.time()
        result = func(*args, **kwargs)
        end    = time.time()
        print(f"{func.__name__} ran in {end-start:.4f}s")
        return result
    return wrapper

@timer
def slow_task():
    time.sleep(0.1)
    return "done"

slow_task()  # slow_task ran in 0.1003s</code></pre>

<h2>Decorator with Arguments</h2>
<pre><code>def repeat(n):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()  # Hello! Hello! Hello!</code></pre>

<h2>Built-in Decorators</h2>
<pre><code>class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property             # access like an attribute, not method()
    def area(self):
        return 3.14 * self.radius ** 2

    @staticmethod         # doesn't need self
    def info():
        return "A shape with no corners"

    @classmethod          # receives class, not instance
    def create_unit(cls):
        return cls(1)     # creates Circle(radius=1)

c = Circle(5)
print(c.area)            # 78.5 (no parentheses!)
print(Circle.info())     # A shape with no corners</code></pre>` }),

    note({ order:12, isPremium:false, readTime:10, title:"Python Generators & Iterators", slug:"python-generators", summary:"Memory-efficient sequences with generators and the yield keyword.",
      content:`<h2>The Problem with Lists</h2>
<pre><code># This loads ALL million numbers into RAM
big_list = [i**2 for i in range(1_000_000)]
# Memory: ~8MB used immediately</code></pre>

<h2>Generators — Lazy Evaluation</h2>
<pre><code># Generator: computes one value at a time
def squares(n):
    for i in range(n):
        yield i**2  # yield pauses and returns a value

# Memory: almost zero (generates on demand!)
gen = squares(1_000_000)
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 4

# Loop over generator
for sq in squares(5):
    print(sq)  # 0 1 4 9 16</code></pre>

<h2>Generator Expressions</h2>
<pre><code># List comprehension (loads all in memory)
squares_list = [x**2 for x in range(10)]

# Generator expression (lazy, saves memory)
squares_gen  = (x**2 for x in range(10))

# Use with sum, max, min, any, all
total = sum(x**2 for x in range(1000))
print(total)</code></pre>

<h2>Practical Example — Read Large File</h2>
<pre><code>def read_large_file(filename):
    """Read file line by line without loading all into RAM"""
    with open(filename) as f:
        for line in f:
            yield line.strip()

# Process each line as it's read — memory efficient!
for line in read_large_file("huge_log.txt"):
    if "ERROR" in line:
        print(line)</code></pre>

<h2>Iterators</h2>
<pre><code># Any object with __iter__ and __next__ is an iterator
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current &lt;= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in Countdown(5):
    print(n)  # 5 4 3 2 1</code></pre>` }),

    note({ order:13, isPremium:false, readTime:8, title:"Python — Virtual Environments & pip", slug:"python-venv", summary:"Manage project dependencies cleanly with virtual environments.",
      content:`<h2>Why Virtual Environments?</h2>
<p>Every project has different package requirements. Without virtual environments, all packages install globally — causing version conflicts between projects.</p>

<pre><code># Problem without venv:
# Project A needs requests 2.28
# Project B needs requests 2.25
# ← CONFLICT!</code></pre>

<h2>Create & Activate</h2>
<pre><code># Create (Python 3.3+)
python -m venv venv

# Activate — Mac/Linux
source venv/bin/activate

# Activate — Windows
venv\Scripts\activate

# You'll see (venv) in your prompt
(venv) $ pip install requests

# Deactivate when done
deactivate</code></pre>

<h2>Managing Dependencies</h2>
<pre><code># Install packages
pip install flask requests numpy

# See what's installed
pip list
pip show requests  # detailed info about one package

# Save dependencies
pip freeze > requirements.txt

# Install on another machine
pip install -r requirements.txt</code></pre>

<h2>requirements.txt</h2>
<pre><code>flask==3.0.0
requests==2.31.0
numpy>=1.24.0
pandas>=2.0.0</code></pre>

<h2>.gitignore — Don't Commit venv</h2>
<pre><code># Add to .gitignore:
venv/
__pycache__/
*.pyc
.env</code></pre>` }),

    note({ order:14, isPremium:false, readTime:12, title:"Python — Common Interview Patterns", slug:"python-interview", summary:"Two pointers, sliding window, hash maps — the patterns that solve 80% of interview questions.",
      content:`<h2>Pattern 1: Two Pointers</h2>
<p>Use two indices moving toward each other — eliminates the need for nested loops.</p>
<pre><code>def two_sum_sorted(arr, target):
    """Find two numbers in sorted array that sum to target"""
    left, right = 0, len(arr) - 1

    while left &lt; right:
        total = arr[left] + arr[right]
        if total == target:
            return [left, right]
        elif total &lt; target:
            left += 1    # need bigger sum
        else:
            right -= 1   # need smaller sum
    return []

# O(n) time, O(1) space
print(two_sum_sorted([1,2,4,6,8,10], 10))  # [2,5]</code></pre>

<h2>Pattern 2: Sliding Window</h2>
<p>Maintain a window and slide it — avoids recalculating from scratch each time.</p>
<pre><code>def max_sum_subarray(arr, k):
    """Max sum of any subarray of size k"""
    window_sum = sum(arr[:k])
    best = window_sum

    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # slide: add right, remove left
        best = max(best, window_sum)

    return best

# O(n) instead of O(n*k)
print(max_sum_subarray([2,1,5,1,3,2], 3))  # 9 (5+1+3)</code></pre>

<h2>Pattern 3: Hash Map (Frequency Counter)</h2>
<pre><code>from collections import Counter

def is_anagram(s, t):
    """Check if two strings are anagrams"""
    return Counter(s) == Counter(t)

def top_k_frequent(nums, k):
    """Return k most frequent elements"""
    count = Counter(nums)
    return [x for x, _ in count.most_common(k)]

print(is_anagram("listen", "silent"))     # True
print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]</code></pre>

<h2>Pattern 4: BFS (Shortest Path)</h2>
<pre><code>from collections import deque

def bfs(graph, start, end):
    """Find shortest path using BFS"""
    queue   = deque([[start]])
    visited = {start}

    while queue:
        path = queue.popleft()
        node = path[-1]

        if node == end:
            return path

        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(path + [neighbor])
    return None</code></pre>` }),

    note({ order:15, isPremium:false, readTime:10, title:"Python Async Programming — asyncio", slug:"python-async", summary:"Write non-blocking Python with asyncio, async/await and concurrent execution.",
      content:`<h2>Why Async?</h2>
<p>Normal Python waits for each operation to finish. Async Python can start a new task while waiting for a slow one (network, file I/O).</p>

<h2>Basic async/await</h2>
<pre><code>import asyncio

async def fetch_data(url):
    print(f"Fetching {url}...")
    await asyncio.sleep(1)  # simulating network delay
    return {"url": url, "data": "result"}

async def main():
    result = await fetch_data("https://api.example.com")
    print(result)

asyncio.run(main())  # entry point for async code</code></pre>

<h2>Run Tasks in Parallel</h2>
<pre><code>async def main():
    # Sequential — takes 3 seconds total
    r1 = await fetch_data("url1")
    r2 = await fetch_data("url2")
    r3 = await fetch_data("url3")

    # Parallel — takes only 1 second!
    results = await asyncio.gather(
        fetch_data("url1"),
        fetch_data("url2"),
        fetch_data("url3"),
    )
    print(results)</code></pre>

<h2>Real HTTP with aiohttp</h2>
<pre><code>import aiohttp

async def get_user(session, user_id):
    url = f"https://jsonplaceholder.typicode.com/users/{user_id}"
    async with session.get(url) as response:
        return await response.json()

async def main():
    async with aiohttp.ClientSession() as session:
        # Fetch 5 users in parallel!
        users = await asyncio.gather(
            *[get_user(session, i) for i in range(1, 6)]
        )
        for user in users:
            print(user["name"])</code></pre>` }),

    // ── Section 4: Premium (order 16-20) ──
    note({ order:16, isPremium:true, readTime:15, title:"Python — Metaclasses & Descriptors", slug:"python-metaclasses", summary:"Advanced Python internals — metaclasses, descriptors and the data model.", content:`<h2>Premium</h2><p>Unlock for ₹10.</p>` }),
    note({ order:17, isPremium:true, readTime:12, title:"Python — Concurrency: Threading vs Multiprocessing", slug:"python-concurrency", summary:"GIL, threads, and true parallelism with multiprocessing.", content:`<h2>Premium</h2>` }),
    note({ order:18, isPremium:true, readTime:15, title:"Python Design Patterns", slug:"python-design-patterns", summary:"Singleton, Factory, Observer in Pythonic style.", content:`<h2>Premium</h2>` }),
    note({ order:19, isPremium:true, readTime:30, title:"Top 50 Python Interview Questions — FAANG", slug:"python-faang-50", summary:"Every Python question asked at Google, Amazon, Meta, Apple, Netflix.", content:`<h2>Premium</h2>` }),
    note({ order:20, isPremium:true, readTime:20, title:"Python System Design", slug:"python-system-design", summary:"Design Twitter, Uber, and YouTube in Python.", content:`<h2>Premium</h2>` }),
  ];

  const pythonNotes = await Promise.all(
    pythonData.map(n => prisma.note.create({ data: { ...n, topicId: python.id } }))
  );
  console.log("✅ Python notes created (20)");

  // ─────────────────────────────────────────────────────────
  //  JAVASCRIPT — 20 notes
  // ─────────────────────────────────────────────────────────
  const jsData = [
    note({ order:1, isPremium:false, readTime:8, title:"JS Basics — Variables & Data Types", slug:"js-variables", summary:"var vs let vs const, JavaScript data types and type checking.",
      content:`<h2>Three Ways to Declare Variables</h2>
<pre><code>// const — cannot be reassigned (use by default!)
const name = "Alice";
const PI   = 3.14159;

// let — can be reassigned (use when value changes)
let score = 0;
score = 10;  // OK

// var — old way, has quirks. Avoid in modern JS.
var oldStyle = "avoid this";</code></pre>

<h2>Data Types</h2>
<pre><code>// Primitive types
const str  = "Hello";           // string
const num  = 42;                // number (integers AND floats!)
const dec  = 3.14;              // also number
const bool = true;              // boolean
const none = null;              // intentionally empty
const notSet = undefined;       // declared but not assigned

// Reference types
const arr  = [1, 2, 3];         // Array
const obj  = { name: "Alice" }; // Object
const fn   = () => {};          // Function</code></pre>

<h2>Checking Types</h2>
<pre><code>typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" ← famous JS bug!
typeof []          // "object"

// Better checks
Array.isArray([])    // true
x === null           // true (for null check)
x === undefined      // true</code></pre>

<h2>Template Literals</h2>
<pre><code>const name = "Alice";
const age  = 25;

// Old way (messy)
console.log("Hello " + name + ", you are " + age);

// Modern way (template literal with backticks)
console.log(\`Hello \${name}, you are \${age}!\`);

// Multi-line strings
const html = \`
  &lt;div&gt;
    &lt;h1&gt;\${name}&lt;/h1&gt;
  &lt;/div&gt;
\`;</code></pre>` }),

    note({ order:2, isPremium:false, readTime:10, title:"JS Functions — Arrow Functions & Closures", slug:"js-functions", summary:"Regular vs arrow functions, closures and higher-order functions.",
      content:`<h2>Function Declaration (Hoisted)</h2>
<pre><code>// Can call before defining (hoisted)
console.log(add(2, 3));  // 5 — works!

function add(a, b) {
  return a + b;
}</code></pre>

<h2>Arrow Functions (Modern)</h2>
<pre><code>// Full syntax
const add = (a, b) => {
  return a + b;
};

// Shorthand (single expression — return is implicit)
const add = (a, b) => a + b;

// Single parameter — can skip parentheses
const double = n => n * 2;

// No parameters
const greet = () => "Hello!";</code></pre>

<h2>Closures</h2>
<p>A closure is when an inner function remembers variables from its outer function.</p>
<pre><code>function makeCounter() {
  let count = 0;  // private variable!
  return {
    increment: () => ++count,
    decrement: () => --count,
    value:     () => count,
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.value());  // 3
// count is hidden from outside!</code></pre>

<h2>Higher-Order Functions</h2>
<pre><code>const nums = [1, 2, 3, 4, 5];

// map — transform each item
const doubled = nums.map(n => n * 2);       // [2,4,6,8,10]

// filter — keep items matching condition
const evens   = nums.filter(n => n % 2 === 0); // [2,4]

// reduce — combine into single value
const sum     = nums.reduce((acc, n) => acc + n, 0); // 15

// Chain them!
const result = nums
  .filter(n => n > 2)   // [3,4,5]
  .map(n => n * 10)     // [30,40,50]
  .reduce((a,b) => a+b, 0); // 120</code></pre>` }),

    note({ order:3, isPremium:false, readTime:10, title:"JS Arrays — All Methods You Need", slug:"js-arrays", summary:"Master every JavaScript array method with real, memorable examples.",
      content:`<h2>Creating Arrays</h2>
<pre><code>const nums   = [1, 2, 3, 4, 5];
const empty  = [];
const mixed  = [1, "hello", true, null];
const matrix = [[1,2], [3,4], [5,6]];</code></pre>

<h2>Add / Remove</h2>
<pre><code>nums.push(6)        // add to END    → [1,2,3,4,5,6]
nums.pop()          // remove END    → [1,2,3,4,5]
nums.unshift(0)     // add to START  → [0,1,2,3,4,5]
nums.shift()        // remove START  → [1,2,3,4,5]
nums.splice(2, 1)   // remove at index 2, 1 item</code></pre>

<h2>Find & Search</h2>
<pre><code>nums.indexOf(3)         // 2 (index) or -1
nums.includes(3)        // true
nums.find(n => n > 3)   // 4 (first match)
nums.findIndex(n => n > 3) // 3 (index of first match)</code></pre>

<h2>Transform</h2>
<pre><code>nums.map(n => n * 2)      // [2,4,6,8,10] — transform each
nums.filter(n => n > 2)   // [3,4,5] — keep matches
nums.reduce((a,n) => a+n, 0)  // 15 — combine

nums.flat()               // flatten one level
nums.flatMap(n => [n,-n]) // map then flatten

nums.slice(1, 3)          // [2,3] — copy portion (no mutation)</code></pre>

<h2>Sort & Iterate</h2>
<pre><code>// Sort numbers (MUST provide compare function!)
[3,1,4,1,5].sort((a,b) => a - b)   // [1,1,3,4,5] ascending
[3,1,4,1,5].sort((a,b) => b - a)   // [5,4,3,1,1] descending

// Sort strings
["banana","apple"].sort()   // ["apple","banana"]

nums.forEach(n => console.log(n))  // iterate (no return)
nums.every(n => n > 0)  // true if ALL match
nums.some(n => n > 4)   // true if ANY matches</code></pre>

<h2>Spread & Destructuring</h2>
<pre><code>const [a, b, ...rest] = [1, 2, 3, 4, 5];
// a=1, b=2, rest=[3,4,5]

const merged = [...arr1, ...arr2];      // combine arrays
const copy   = [...arr];                // shallow copy
const unique = [...new Set(arr)];       // remove duplicates!</code></pre>` }),

    note({ order:4, isPremium:false, readTime:8, title:"JS Objects & Destructuring", slug:"js-objects", summary:"Object creation, destructuring, spread and the most useful object methods.",
      content:`<h2>Object Basics</h2>
<pre><code>const user = {
  name: "Alice",
  age:  25,
  address: {
    city:    "Delhi",
    country: "India",
  },
  greet() {           // method shorthand
    return \`Hi, I'm \${this.name}\`;
  },
};

console.log(user.name);           // Alice
console.log(user["age"]);         // 25
console.log(user.address.city);   // Delhi
console.log(user.greet());        // Hi, I'm Alice</code></pre>

<h2>Add, Update, Delete</h2>
<pre><code>user.email = "alice@x.com";  // add property
user.age   = 26;             // update property
delete user.address;         // delete property

// Check if property exists
"name" in user    // true
user.hasOwnProperty("email")  // true</code></pre>

<h2>Destructuring</h2>
<pre><code>const { name, age } = user;         // basic
const { name: fullName } = user;    // rename
const { city = "Unknown" } = user;  // default value

// Nested destructuring
const { address: { city } } = user;

// In function parameters
function greet({ name, age = 0 }) {
  return \`\${name} is \${age}\`;
}
greet(user);  // Alice is 26</code></pre>

<h2>Object Methods</h2>
<pre><code>Object.keys(user)    // ["name", "age", ...]
Object.values(user)  // ["Alice", 26, ...]
Object.entries(user) // [["name","Alice"], ...]

// Merge / clone
const updated = { ...user, age: 27 };      // spread
const clone   = Object.assign({}, user);   // assign

// Freeze — prevent modification
const CONSTANTS = Object.freeze({ PI: 3.14 });</code></pre>` }),

    note({ order:5, isPremium:false, readTime:12, title:"JS Async — Promises & Async/Await", slug:"js-async", summary:"Handle asynchronous operations cleanly — callbacks, promises and async/await.",
      content:`<h2>The Problem — Callbacks</h2>
<pre><code>// Callback hell — deeply nested, hard to read
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      console.log(c);  // callback hell!
    });
  });
});</code></pre>

<h2>Promises — Cleaner</h2>
<pre><code>const fetchUser = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id > 0)
      resolve({ id, name: "Alice" });
    else
      reject(new Error("Invalid ID"));
  }, 1000);
});

fetchUser(1)
  .then(user  => console.log(user.name))  // Alice
  .catch(err  => console.error(err.message))
  .finally(() => console.log("Done!"));</code></pre>

<h2>Async/Await — Best Way</h2>
<pre><code>async function getUser(id) {
  try {
    const res  = await fetch(\`/api/users/\${id}\`);

    if (!res.ok) {
      throw new Error(\`HTTP error: \${res.status}\`);
    }

    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Failed:", error.message);
    throw error; // re-throw so caller can handle
  }
}

// Call it
const user = await getUser(1);
console.log(user.name);</code></pre>

<h2>Parallel Requests</h2>
<pre><code>// Sequential — 3 seconds total
const user  = await fetchUser(1);
const posts = await fetchPosts(1);

// Parallel — 1 second total!
const [user2, posts2] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
]);

// Promise.allSettled — doesn't fail if one fails
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(-1),  // this one fails
]);
// results[0].status = "fulfilled"
// results[1].status = "rejected"</code></pre>` }),

    // Section 2 (order 6-10)
    note({ order:6, isPremium:false, readTime:10, title:"JS DOM Manipulation", slug:"js-dom", summary:"Select, modify, create and listen to events on HTML elements.",
      content:`<h2>Selecting Elements</h2>
<pre><code>// By ID (returns one element)
const title = document.getElementById("main-title");

// By CSS selector (returns FIRST match)
const btn  = document.querySelector(".submit-btn");
const card = document.querySelector("#card");

// All matching elements (returns NodeList)
const items = document.querySelectorAll(".item");
const links = document.querySelectorAll("a");</code></pre>

<h2>Reading & Modifying Content</h2>
<pre><code>const el = document.querySelector("h1");

// Text content (safe — escapes HTML)
el.textContent = "New Title";
console.log(el.textContent);

// HTML content (renders HTML — careful with user input!)
el.innerHTML = "&lt;span&gt;Bold&lt;/span&gt; Title";

// Attributes
el.getAttribute("class");
el.setAttribute("data-id", "123");
el.removeAttribute("disabled");</code></pre>

<h2>Styling</h2>
<pre><code>el.style.color      = "teal";
el.style.fontSize   = "2rem";
el.style.display    = "none";  // hide

// Classes (better than inline styles)
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("dark");
el.classList.contains("active");  // true/false</code></pre>

<h2>Events</h2>
<pre><code>const btn = document.querySelector("button");

btn.addEventListener("click", (event) => {
  event.preventDefault();   // stop form submit / link follow
  event.stopPropagation();  // stop event bubbling
  console.log("Clicked!", event.target);
});

// Common events:
// click, dblclick, mouseover, mouseout
// keydown, keyup, keypress
// submit, input, change, focus, blur
// DOMContentLoaded, load, resize, scroll</code></pre>

<h2>Creating & Removing Elements</h2>
<pre><code>// Create
const li = document.createElement("li");
li.textContent  = "New item";
li.classList.add("list-item");

// Add to DOM
document.querySelector("ul").appendChild(li);
// or
parentEl.insertBefore(li, referenceEl);

// Remove
li.remove();</code></pre>` }),

    note({ order:7, isPremium:false, readTime:10, title:"JS ES6+ Features", slug:"js-es6", summary:"All modern JS features — spread, rest, optional chaining, nullish coalescing, modules.",
      content:`<h2>Destructuring</h2>
<pre><code>// Array destructuring
const [a, b, ...rest] = [1, 2, 3, 4, 5];
// a=1, b=2, rest=[3,4,5]

// Object destructuring with rename and default
const { name: fullName = "Anonymous", age = 0 } = user;

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x];   // x=2, y=1</code></pre>

<h2>Spread & Rest</h2>
<pre><code>// Spread — expand
const arr     = [1, 2, 3];
const merged  = [...arr, 4, 5];      // [1,2,3,4,5]
const copy    = [...arr];            // shallow clone

const updated = { ...obj, name: "Bob" };  // update one field

// Rest — collect remaining
function first(a, b, ...rest) {
  console.log(rest);  // array of remaining args
}</code></pre>

<h2>Optional Chaining & Nullish Coalescing</h2>
<pre><code>const user = null;

// Without optional chaining — ERROR!
// user.profile.name  ← TypeError

// With optional chaining — safe
const name = user?.profile?.name;  // undefined (no error)
const city = user?.address?.city ?? "Unknown";

// Optional method call
const result = obj?.method?.();</code></pre>

<h2>Modules (import/export)</h2>
<pre><code">// math.js — named exports
export const PI  = 3.14159;
export function add(a, b) { return a + b; }

// math.js — default export
export default function multiply(a, b) { return a * b; }

// main.js — import
import multiply, { PI, add } from "./math.js";

// Import everything
import * as math from "./math.js";
math.add(2, 3);</code></pre>

<h2>Short-Circuit Evaluation</h2>
<pre><code">// && — if left is falsy, returns left; else returns right
false && "hello"   // false
true  && "hello"   // "hello"

// || — if left is truthy, returns left; else returns right
"Alice" || "Guest" // "Alice"
""      || "Guest" // "Guest"

// ?? — only checks null/undefined (not all falsy!)
0       ?? "default"  // 0  (not replaced! 0 ≠ null)
null    ?? "default"  // "default"
undefined ?? "default" // "default"</code></pre>` }),

    note({ order:8, isPremium:false, readTime:10, title:"JS Classes & Prototypes", slug:"js-classes", summary:"ES6 class syntax, inheritance, private fields and the prototype chain.",
      content:`<h2>Class Syntax</h2>
<pre><code>class Animal {
  #sound;   // private field (ES2022)

  constructor(name, sound) {
    this.name  = name;
    this.#sound = sound;
  }

  speak() {
    return \`\${this.name} says \${this.#sound}!\`;
  }

  // Static method — called on class, not instance
  static create(name, sound) {
    return new Animal(name, sound);
  }

  // Getter — access like property
  get info() {
    return \`\${this.name} (animal)\`;
  }
}

const dog = Animal.create("Rex", "Woof");
console.log(dog.speak());   // Rex says Woof!
console.log(dog.info);      // Rex (animal)</code></pre>

<h2>Inheritance</h2>
<pre><code>class Dog extends Animal {
  #tricks = [];

  constructor(name) {
    super(name, "Woof");  // MUST call super first!
  }

  learn(trick) {
    this.#tricks.push(trick);
    return this;  // enable chaining
  }

  perform() {
    return \`\${this.name} knows: \${this.#tricks.join(", ")}\`;
  }
}

const rex = new Dog("Rex");
rex.learn("sit").learn("shake").learn("roll over");
console.log(rex.perform());
// Rex knows: sit, shake, roll over</code></pre>` }),

    note({ order:9, isPremium:false, readTime:8, title:"JS Error Handling", slug:"js-errors", summary:"try/catch, error types, custom errors and global error handlers.",
      content:`<h2>try/catch/finally</h2>
<pre><code>function parseJSON(str) {
  try {
    const data = JSON.parse(str);
    return data;
  } catch (error) {
    console.error("Parse failed:", error.message);
    return null;
  } finally {
    console.log("Parse attempted");  // always runs
  }
}

parseJSON('{"name":"Alice"}');  // works
parseJSON("not json");           // caught gracefully</code></pre>

<h2>Error Types</h2>
<pre><code">const x = undefined;
x.name;              // TypeError — can't access property of undefined
notDeclared;         // ReferenceError — variable not declared
eval("}{");          // SyntaxError
parseInt("abc");     // NaN — not an Error, but bad value!</code></pre>

<h2>Custom Errors</h2>
<pre><code">class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name  = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(status, url) {
    super(\`HTTP \${status} at \${url}\`);
    this.name   = "NetworkError";
    this.status = status;
  }
}

try {
  throw new ValidationError("email", "Invalid email format");
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(\`Field "\${e.field}": \${e.message}\`);
  } else {
    throw e;  // re-throw unknown errors
  }
}</code></pre>` }),

    note({ order:10, isPremium:false, readTime:10, title:"JS Performance — Debounce & Throttle", slug:"js-performance", summary:"Optimize event handlers with debounce, throttle and memoization.",
      content:`<h2>Debounce — Wait Until Done</h2>
<p>Only runs after the user <em>stops</em> doing something for a set time. Perfect for search inputs.</p>
<pre><code>function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);  // cancel previous timer
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage — only fires 300ms after user stops typing
const search = debounce((query) => {
  console.log("Searching:", query);
  fetchResults(query);
}, 300);

input.addEventListener("input", e => search(e.target.value));</code></pre>

<h2>Throttle — Limit Rate</h2>
<p>Only runs <em>at most once</em> per time period. Perfect for scroll handlers.</p>
<pre><code>function throttle(fn, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

// Fires at most once per 100ms during scroll
window.addEventListener("scroll", throttle(() => {
  updateScrollProgress();
}, 100));</code></pre>

<h2>Memoization — Cache Results</h2>
<pre><code>function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);  // return cached result
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Computing...");
  return n * n;
});

expensiveCalc(5);  // Computing... 25
expensiveCalc(5);  // 25 (from cache, no computing!)</code></pre>` }),

    // Section 3 (order 11-15)
    note({ order:11, isPremium:false, readTime:10, title:"JS Design Patterns", slug:"js-patterns", summary:"Module, Observer, Factory, Singleton — patterns for clean, scalable JavaScript.", content:`<h2>Module Pattern</h2><pre><code>const counter = (() => {
  let _count = 0;
  return {
    increment: () => ++_count,
    decrement: () => --_count,
    value:     () => _count,
    reset:     () => { _count = 0; },
  };
})();</code></pre><h2>Observer / EventEmitter</h2><pre><code>class EventEmitter {
  #events = {};
  on(e, fn)       { (this.#events[e] ??= []).push(fn); }
  off(e, fn)      { this.#events[e] = (this.#events[e]??[]).filter(f=>f!==fn); }
  emit(e, ...a)   { (this.#events[e]??[]).forEach(fn=>fn(...a)); }
  once(e, fn)     { const wrap=(...a)=>{fn(...a);this.off(e,wrap)}; this.on(e,wrap); }
}</code></pre>` }),
    note({ order:12, isPremium:false, readTime:8, title:"JS Web APIs — fetch, localStorage, WebSockets", slug:"js-web-apis", summary:"Browser APIs every developer uses: fetch, storage, timers and WebSockets.", content:`<h2>Fetch API</h2><pre><code>const res  = await fetch('/api/users', { method:'GET' });
const data = await res.json();

// POST request
await fetch('/api/users', {
  method:  'POST',
  headers: { 'Content-Type': 'application/json' },
  body:    JSON.stringify({ name: 'Alice' }),
});</code></pre>` }),
    note({ order:13, isPremium:false, readTime:10, title:"JS Functional Programming", slug:"js-functional", summary:"Pure functions, immutability, composition and currying in JavaScript.", content:`<h2>Pure Functions</h2><pre><code>// Pure — predictable
const add = (a, b) => a + b;

// Impure — depends on external state
let factor = 2;
const multiply = n => n * factor; // bad!</code></pre>` }),
    note({ order:14, isPremium:false, readTime:10, title:"JS Regex & String Manipulation", slug:"js-regex", summary:"Regular expressions and string methods for real-world text processing.", content:`<h2>String Methods</h2><pre><code>const str = "Hello, World!";
str.includes("World")   // true
str.startsWith("Hello") // true
str.slice(7, 12)        // "World"
str.replace("World","JS") // "Hello, JS!"
str.split(", ")         // ["Hello", "World!"]</code></pre>` }),
    note({ order:15, isPremium:false, readTime:12, title:"JS Interview Prep — Key Concepts", slug:"js-interview", summary:"Hoisting, closure, event loop, 'this' — the concepts every JS interview tests.", content:`<h2>Hoisting</h2><pre><code>console.log(x); // undefined (not error)
var x = 5;
console.log(y); // ReferenceError!
let y = 5;</code></pre><h2>Event Loop</h2><pre><code>console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2</code></pre>` }),

    // Premium
    note({ order:16, isPremium:true, readTime:15, title:"JS Advanced Async — Streams & Workers", slug:"js-streams", summary:"Web Workers, ReadableStreams and advanced async patterns.", content:`<h2>Premium</h2>` }),
    note({ order:17, isPremium:true, readTime:12, title:"JS Engine Internals — V8 & JIT", slug:"js-engine", summary:"How JavaScript really runs — V8, JIT compilation and memory.", content:`<h2>Premium</h2>` }),
    note({ order:18, isPremium:true, readTime:12, title:"JS Security — XSS, CSRF & CSP", slug:"js-security", summary:"Secure your applications against common web vulnerabilities.", content:`<h2>Premium</h2>` }),
    note({ order:19, isPremium:true, readTime:30, title:"Top 50 JS Interview Questions", slug:"js-interview-50", summary:"Every JS question from major tech companies — with complete answers.", content:`<h2>Premium</h2>` }),
    note({ order:20, isPremium:true, readTime:20, title:"JS Frontend System Design", slug:"js-system-design", summary:"Design large-scale frontend systems — patterns and architecture.", content:`<h2>Premium</h2>` }),
  ];

  await Promise.all(jsData.map(n => prisma.note.create({ data: { ...n, topicId: javascript.id } })));
  console.log("✅ JavaScript notes created (20)");

  // ─────────────────────────────────────────────────────────
  //  GIT — 15 notes
  // ─────────────────────────────────────────────────────────
  const gitNotes = [
    note({ order:1, isPremium:false, readTime:8,  title:"Git Basics — init, add, commit",          slug:"git-basics",      summary:"The 3 commands you'll use every day as a developer.", content:`<h2>What is Git?</h2><p>Git saves snapshots of your project over time. Every commit is a restore point you can go back to.</p><h2>Core Workflow</h2><pre><code>git init                     # start tracking this folder
git add .                    # stage all changes
git add filename.txt         # stage one file
git commit -m "Add feature"  # save snapshot</code></pre><h2>Check Status</h2><pre><code>git status          # what's changed?
git log --oneline   # commit history</code></pre>` }),
    note({ order:2, isPremium:false, readTime:10, title:"Git Branching & Merging",                slug:"git-branching",   summary:"Work on features without affecting main code with branches.", content:`<h2>Branches</h2><pre><code>git checkout -b feature/login  # create + switch
git switch main                # switch back
git branch                     # list branches
git merge feature/login        # merge into current
git branch -d feature/login    # delete merged branch</code></pre>` }),
    note({ order:3, isPremium:false, readTime:8,  title:"Git & GitHub — push, pull, clone",         slug:"git-github",      summary:"Connect to GitHub and collaborate with others.", content:`<h2>Remote</h2><pre><code>git remote add origin https://github.com/user/repo.git
git push -u origin main   # first push
git push                  # after that

git clone https://github.com/user/repo.git
git pull</code></pre>` }),
    note({ order:4, isPremium:false, readTime:8,  title:"Git — Undo Mistakes",                    slug:"git-undo",        summary:"Safely undo any type of mistake — staged, unstaged or committed.", content:`<h2>Undo</h2><pre><code>git restore filename.txt         # discard unstaged
git restore --staged filename.txt # unstage file
git reset --soft HEAD~1          # undo commit, keep changes
git revert abc1234               # safe undo (creates new commit)</code></pre>` }),
    note({ order:5, isPremium:false, readTime:6,  title:"Git Stash",                              slug:"git-stash",       summary:"Save work-in-progress without committing to switch contexts.", content:`<h2>Stash</h2><pre><code>git stash          # save current work
git stash pop      # restore latest stash
git stash list     # see all stashes
git stash apply stash@{1}  # specific stash</code></pre>` }),
    note({ order:6, isPremium:false, readTime:10, title:"Git Rebase & Squashing",                 slug:"git-rebase",      summary:"Clean up commit history with interactive rebase.", content:`<h2>Interactive Rebase</h2><pre><code>git rebase -i HEAD~3  # squash last 3 commits
# Change 'pick' to 'squash' for commits to merge</code></pre>` }),
    note({ order:7, isPremium:false, readTime:8,  title:"Git Cherry-pick & Tags",                 slug:"git-cherry-pick", summary:"Apply specific commits and mark releases with tags.", content:`<h2>Cherry Pick</h2><pre><code>git cherry-pick abc1234  # apply one commit to current branch</code></pre><h2>Tags</h2><pre><code>git tag -a v1.0.0 -m "Release"
git push origin v1.0.0</code></pre>` }),
    note({ order:8, isPremium:false, readTime:10, title:"Git — Resolving Merge Conflicts",        slug:"git-conflicts",   summary:"Understand and resolve merge conflicts confidently.", content:`<h2>What a Conflict Looks Like</h2><pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
const msg = 'Hello';
=======
const msg = 'Hi there';
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/greet</code></pre><h2>Fix</h2><ol><li>Open the file</li><li>Remove conflict markers</li><li>Keep correct code</li><li>git add . && git commit</li></ol>` }),
    note({ order:9, isPremium:false, readTime:10, title:"Git Workflows — Gitflow",                slug:"git-workflows",   summary:"Professional team workflows for consistent collaboration.", content:`<h2>Gitflow Branches</h2><ul><li>main — production</li><li>develop — integration</li><li>feature/* — new features</li><li>release/* — release prep</li><li>hotfix/* — urgent fixes</li></ul>` }),
    note({ order:10, isPremium:false, readTime:10, title:"Git Bisect & Hooks",                    slug:"git-bisect",      summary:"Find bugs with bisect and automate workflows with hooks.", content:`<h2>Bisect</h2><pre><code>git bisect start
git bisect bad          # current commit has bug
git bisect good v1.0    # this version was fine
git bisect reset        # finish</code></pre>` }),
    note({ order:11, isPremium:true, readTime:15, title:"GitHub Actions — CI/CD",                 slug:"git-actions",     summary:"Automate testing and deployment pipelines.", content:`<h2>Premium</h2>` }),
    note({ order:12, isPremium:true, readTime:12, title:"Git Internals — Objects & Trees",        slug:"git-internals",   summary:"How Git stores data under the hood.", content:`<h2>Premium</h2>` }),
    note({ order:13, isPremium:true, readTime:10, title:"Monorepo with Git",                      slug:"git-monorepo",    summary:"Manage multiple projects in a single repository.", content:`<h2>Premium</h2>` }),
    note({ order:14, isPremium:true, readTime:10, title:"Git Security — Signed Commits",          slug:"git-security",    summary:"GPG signing and secret scanning for secure repos.", content:`<h2>Premium</h2>` }),
    note({ order:15, isPremium:true, readTime:20, title:"Top 30 Git Interview Questions",         slug:"git-interview-30",summary:"Every Git question asked in technical interviews.", content:`<h2>Premium</h2>` }),
  ];
  await Promise.all(gitNotes.map(n => prisma.note.create({ data: { ...n, topicId: git.id } })));
  console.log("✅ Git notes created (15)");

  // Quick create for remaining topics
  const makeNotes = async (topicId, notes) => {
    await Promise.all(notes.map(n => prisma.note.create({ data: { ...n, topicId } })));
  };

  // SQL — 15 notes
  await makeNotes(sql.id, [
    note({ order:1,  isPremium:false, readTime:8,  title:"SQL Basics — SELECT, WHERE, ORDER BY",  slug:"sql-select",       summary:"Query data with SELECT, filter with WHERE, sort with ORDER BY.", content:`<h2>SELECT</h2><pre><code>SELECT * FROM users;\nSELECT name, email FROM users;\nSELECT name AS full_name FROM users;\nSELECT * FROM users WHERE active = true;\nSELECT * FROM users WHERE age > 18 AND city = 'Delhi';\nSELECT * FROM products ORDER BY price DESC LIMIT 10;</code></pre>` }),
    note({ order:2,  isPremium:false, readTime:10, title:"SQL JOINs",                             slug:"sql-joins",         summary:"Combine data from multiple tables with INNER, LEFT, RIGHT JOIN.", content:`<h2>INNER JOIN</h2><pre><code>SELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;</code></pre><h2>LEFT JOIN</h2><pre><code>SELECT u.name, o.total\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;\n-- Shows ALL users, even those with no orders</code></pre>` }),
    note({ order:3,  isPremium:false, readTime:8,  title:"SQL GROUP BY & Aggregates",             slug:"sql-groupby",       summary:"Summarize data with COUNT, SUM, AVG, MAX, MIN and GROUP BY.", content:`<h2>Aggregates</h2><pre><code>SELECT COUNT(*) FROM users;\nSELECT city, COUNT(*) AS cnt FROM users GROUP BY city HAVING COUNT(*) > 10;</code></pre>` }),
    note({ order:4,  isPremium:false, readTime:8,  title:"SQL INSERT, UPDATE, DELETE",            slug:"sql-write",         summary:"Safely insert, update and delete data in your database.", content:`<h2>Write Operations</h2><pre><code>INSERT INTO users (name, email) VALUES ('Alice', 'a@x.com');\nUPDATE users SET age = 26 WHERE id = 1;\nDELETE FROM sessions WHERE created_at < NOW() - INTERVAL '30 days';</code></pre>` }),
    note({ order:5,  isPremium:false, readTime:8,  title:"SQL Subqueries & CTEs",                slug:"sql-subqueries",    summary:"Write complex queries with subqueries and Common Table Expressions.", content:`<h2>Subqueries</h2><pre><code>SELECT name FROM users WHERE id IN (SELECT user_id FROM orders);</code></pre><h2>CTE</h2><pre><code>WITH active AS (SELECT id, name FROM users WHERE active=true)\nSELECT * FROM active;</code></pre>` }),
    note({ order:6,  isPremium:false, readTime:10, title:"SQL Indexes & Performance",            slug:"sql-indexes",       summary:"Speed up queries with proper indexing strategies.", content:`<h2>Create Index</h2><pre><code>CREATE INDEX idx_users_email ON users(email);\nEXPLAIN ANALYZE SELECT * FROM users WHERE email='a@x.com';</code></pre>` }),
    note({ order:7,  isPremium:false, readTime:10, title:"SQL Window Functions",                 slug:"sql-window",        summary:"ROW_NUMBER, RANK, LAG, LEAD — powerful analytics functions.", content:`<h2>Window Functions</h2><pre><code>SELECT name, salary,\n  ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rank\nFROM employees;</code></pre>` }),
    note({ order:8,  isPremium:false, readTime:8,  title:"SQL Transactions & ACID",             slug:"sql-transactions",  summary:"Ensure data integrity with transactions and ACID properties.", content:`<h2>Transaction</h2><pre><code>BEGIN;\nUPDATE accounts SET balance=balance-500 WHERE id=1;\nUPDATE accounts SET balance=balance+500 WHERE id=2;\nCOMMIT;</code></pre>` }),
    note({ order:9,  isPremium:false, readTime:12, title:"SQL Schema Design",                    slug:"sql-schema",        summary:"Design clean relational schemas — normalization (1NF, 2NF, 3NF).", content:`<h2>Create Table</h2><pre><code>CREATE TABLE users (\n  id    SERIAL PRIMARY KEY,\n  name  VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP DEFAULT NOW()\n);</code></pre>` }),
    note({ order:10, isPremium:false, readTime:12, title:"SQL Interview Questions",              slug:"sql-interview",     summary:"Most asked SQL questions — second highest salary, duplicates, and more.", content:`<h2>Second Highest Salary</h2><pre><code>SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);</code></pre><h2>Find Duplicates</h2><pre><code>SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;</code></pre>` }),
    note({ order:11, isPremium:true,  readTime:15, title:"SQL Query Optimization",              slug:"sql-optimization",  summary:"Advanced optimization — execution plans, statistics and indexes.", content:`<h2>Premium</h2>` }),
    note({ order:12, isPremium:true,  readTime:12, title:"PostgreSQL Advanced Features",       slug:"sql-postgres",      summary:"JSONB, arrays, full-text search, and pg-specific features.", content:`<h2>Premium</h2>` }),
    note({ order:13, isPremium:true,  readTime:12, title:"Database Sharding & Replication",   slug:"sql-sharding",      summary:"Scale databases horizontally with sharding and replication.", content:`<h2>Premium</h2>` }),
    note({ order:14, isPremium:true,  readTime:10, title:"NoSQL vs SQL",                       slug:"sql-vs-nosql",      summary:"MongoDB, Redis, Cassandra vs PostgreSQL — choose the right database.", content:`<h2>Premium</h2>` }),
    note({ order:15, isPremium:true,  readTime:25, title:"Top 40 SQL Interview Questions",    slug:"sql-interview-40",  summary:"Every SQL question asked at Amazon, Google, Microsoft.", content:`<h2>Premium</h2>` }),
  ]);
  console.log("✅ SQL notes (15)");

  // HTML — 10 notes
  await makeNotes(html.id, [
    note({ order:1,  isPremium:false, readTime:8,  title:"HTML Basics — Tags & Structure",    slug:"html-basics",       summary:"HTML document structure, common tags and attributes.", content:`<h2>HTML Structure</h2><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang="en"&gt;\n&lt;head&gt;\n  &lt;meta charset="UTF-8"&gt;\n  &lt;title&gt;My Page&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1&gt;Hello!&lt;/h1&gt;\n  &lt;p&gt;A paragraph.&lt;/p&gt;\n  &lt;a href="https://google.com"&gt;Link&lt;/a&gt;\n  &lt;img src="photo.jpg" alt="Description"&gt;\n&lt;/body&gt;\n&lt;/html&gt;</code></pre>` }),
    note({ order:2,  isPremium:false, readTime:8,  title:"HTML Semantic Elements",             slug:"html-semantic",     summary:"Use semantic tags for better accessibility and SEO.", content:`<h2>Semantic Tags</h2><pre><code>&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;section&gt;, &lt;aside&gt;, &lt;footer&gt;</code></pre><p>Semantic HTML tells browsers <em>what</em> content means, not just how it looks.</p>` }),
    note({ order:3,  isPremium:false, readTime:10, title:"HTML Forms & Inputs",                slug:"html-forms",        summary:"Build accessible forms with all input types and validation.", content:`<h2>Form</h2><pre><code>&lt;form action="/submit" method="POST"&gt;\n  &lt;label for="email"&gt;Email&lt;/label&gt;\n  &lt;input type="email" id="email" required&gt;\n  &lt;button type="submit"&gt;Submit&lt;/button&gt;\n&lt;/form&gt;</code></pre>` }),
    note({ order:4,  isPremium:false, readTime:6,  title:"HTML Tables",                        slug:"html-tables",       summary:"Display tabular data with well-structured HTML tables.", content:`<h2>Table</h2><pre><code>&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Age&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Alice&lt;/td&gt;&lt;td&gt;25&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</code></pre>` }),
    note({ order:5,  isPremium:false, readTime:10, title:"HTML Accessibility — ARIA",          slug:"html-a11y",         summary:"Make HTML accessible to everyone with ARIA and best practices.", content:`<h2>ARIA</h2><pre><code>&lt;button aria-label="Close dialog"&gt;×&lt;/button&gt;\n&lt;img src="chart.png" alt="Revenue grew 20% in Q4"&gt;\n&lt;nav aria-label="Main navigation"&gt;</code></pre>` }),
    note({ order:6,  isPremium:true,  readTime:12, title:"HTML5 APIs",                         slug:"html5-apis",        summary:"Canvas, Video, Web Storage and more HTML5 APIs.", content:`<h2>Premium</h2>` }),
    note({ order:7,  isPremium:true,  readTime:10, title:"HTML SEO Best Practices",            slug:"html-seo",          summary:"Optimize HTML for search engines.", content:`<h2>Premium</h2>` }),
    note({ order:8,  isPremium:true,  readTime:10, title:"HTML Email Templates",               slug:"html-email",        summary:"Build HTML emails that work in every client.", content:`<h2>Premium</h2>` }),
    note({ order:9,  isPremium:true,  readTime:10, title:"HTML Performance",                   slug:"html-performance",  summary:"Lazy loading, preloading and resource hints.", content:`<h2>Premium</h2>` }),
    note({ order:10, isPremium:true,  readTime:20, title:"Top 30 HTML Interview Questions",   slug:"html-interview",    summary:"Every HTML question asked in frontend interviews.", content:`<h2>Premium</h2>` }),
  ]);
  console.log("✅ HTML notes (10)");

  // CSS — 15 notes
  await makeNotes(css.id, [
    note({ order:1,  isPremium:false, readTime:8,  title:"CSS Basics — Selectors & Box Model",  slug:"css-basics",       summary:"CSS selectors, specificity, the box model and cascading.", content:`<h2>Selectors</h2><pre><code>h1 { color: teal; }         /* tag */\n.card { padding: 1rem; }    /* class */\n#header { height: 64px; }   /* id */\ndiv p { ... }               /* descendant */\nbutton:hover { ... }        /* pseudo-class */</code></pre><h2>Box Model</h2><pre><code>.box {\n  width: 300px; height: 200px;\n  padding: 20px;   /* inside border */\n  border: 2px solid black;\n  margin: 10px;    /* outside border */\n  box-sizing: border-box;\n}</code></pre>` }),
    note({ order:2,  isPremium:false, readTime:12, title:"CSS Flexbox — Complete Guide",        slug:"css-flexbox",      summary:"Master Flexbox — every property explained with clear examples.", content:`<h2>Enable Flexbox</h2><pre><code>.container { display: flex; }</code></pre><h2>Alignment</h2><pre><code>.container {\n  flex-direction: row | column;\n  justify-content: center | space-between | flex-end;\n  align-items: center | stretch | flex-start;\n  gap: 1rem;\n}</code></pre><h2>Perfect Center</h2><pre><code>.center { display:flex; justify-content:center; align-items:center; height:100vh; }</code></pre>` }),
    note({ order:3,  isPremium:false, readTime:12, title:"CSS Grid — Complete Guide",           slug:"css-grid",         summary:"Build two-dimensional layouts with CSS Grid.", content:`<h2>Define Grid</h2><pre><code>.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n\n/* Auto-responsive — no media queries! */\n.grid {\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}</code></pre>` }),
    note({ order:4,  isPremium:false, readTime:10, title:"CSS Responsive Design & Media Queries", slug:"css-responsive", summary:"Make websites work on all screen sizes with media queries.", content:`<h2>Mobile First</h2><pre><code>/* Mobile default */\n.container { padding: 1rem; }\n\n@media (min-width: 768px) {\n  .container { padding: 2rem; }\n}\n\n@media (min-width: 1024px) {\n  .container { max-width: 1200px; margin: 0 auto; }\n}</code></pre>` }),
    note({ order:5,  isPremium:false, readTime:8,  title:"CSS Variables & Custom Properties",   slug:"css-variables",    summary:"Maintain consistent styles with CSS custom properties.", content:`<h2>Variables</h2><pre><code>:root {\n  --color-primary: #0d9488;\n  --spacing: 1rem;\n}\n\n.button {\n  background: var(--color-primary);\n  padding: var(--spacing);\n}</code></pre><h2>Dark Mode</h2><pre><code>@media (prefers-color-scheme: dark) {\n  :root { --bg: #0f172a; --text: #e2e8f0; }\n}</code></pre>` }),
    note({ order:6,  isPremium:false, readTime:10, title:"CSS Animations & Transitions",        slug:"css-animations",   summary:"Bring UI to life with smooth transitions and keyframe animations.", content:`<h2>Transitions</h2><pre><code>.card {\n  transition: transform 0.2s ease, box-shadow 0.2s;\n}\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 30px rgba(0,0,0,.1);\n}</code></pre><h2>Keyframes</h2><pre><code>@keyframes fadeIn {\n  from { opacity:0; transform:translateY(20px); }\n  to   { opacity:1; transform:translateY(0); }\n}\n.el { animation: fadeIn 0.5s ease forwards; }</code></pre>` }),
    note({ order:7,  isPremium:false, readTime:8,  title:"CSS Typography & Google Fonts",       slug:"css-typography",   summary:"Style text professionally — fonts, spacing and readability.", content:`<h2>Google Fonts</h2><pre><code>&lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"&gt;</code></pre><h2>Typography</h2><pre><code>body {\n  font-family: 'Inter', sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n  color: #1e293b;\n}</code></pre>` }),
    note({ order:8,  isPremium:false, readTime:8,  title:"CSS Pseudo-classes & Pseudo-elements", slug:"css-pseudo",      summary:"Style element states and create decorative content.", content:`<h2>Pseudo-classes</h2><pre><code>a:hover { color: teal; }\ninput:focus { border-color: teal; outline: none; }\nli:nth-child(odd) { background: #f8f8f8; }</code></pre><h2>Pseudo-elements</h2><pre><code>.quote::before { content: '"'; font-size: 3rem; }\n.clearfix::after { content:""; display:table; clear:both; }</code></pre>` }),
    note({ order:9,  isPremium:false, readTime:10, title:"CSS Modern Features — clamp & Container Queries", slug:"css-modern", summary:"Modern CSS without media queries — clamp(), container queries.", content:`<h2>clamp()</h2><pre><code>h1 { font-size: clamp(1.5rem, 5vw, 3rem); }</code></pre><h2>Container Queries</h2><pre><code>.wrapper { container-type: inline-size; }\n@container (min-width: 400px) {\n  .card { flex-direction: row; }\n}</code></pre>` }),
    note({ order:10, isPremium:false, readTime:12, title:"CSS Interview Questions",              slug:"css-interview",    summary:"Top CSS interview questions — specificity, position, BFC, and more.", content:`<h2>Specificity</h2><p>inline > #id > .class > tag. Higher specificity wins.</p><h2>Position Values</h2><ul><li>static — default</li><li>relative — offset from normal position</li><li>absolute — relative to nearest positioned ancestor</li><li>fixed — relative to viewport</li><li>sticky — toggles between relative/fixed</li></ul>` }),
    note({ order:11, isPremium:true,  readTime:10, title:"CSS Architecture — BEM & SMACSS",    slug:"css-arch",         summary:"Scalable CSS architecture for large projects.", content:`<h2>Premium</h2>` }),
    note({ order:12, isPremium:true,  readTime:12, title:"Tailwind CSS Mastery",                slug:"css-tailwind",     summary:"Build fast UIs with utility-first Tailwind CSS.", content:`<h2>Premium</h2>` }),
    note({ order:13, isPremium:true,  readTime:10, title:"CSS Performance",                     slug:"css-perf",         summary:"Optimize CSS for 60fps animations and fast rendering.", content:`<h2>Premium</h2>` }),
    note({ order:14, isPremium:true,  readTime:10, title:"CSS-in-JS",                           slug:"css-in-js",        summary:"Styled-components, Emotion and CSS Modules.", content:`<h2>Premium</h2>` }),
    note({ order:15, isPremium:true,  readTime:20, title:"Top 40 CSS Interview Questions",      slug:"css-interview-40", summary:"Every CSS question asked at frontend interviews.", content:`<h2>Premium</h2>` }),
  ]);
  console.log("✅ CSS notes (15)");

  // DSA — 15 notes
  await makeNotes(dsa.id, [
    note({ order:1,  isPremium:false, readTime:8,  title:"Arrays — Foundation",                 slug:"dsa-arrays",       summary:"Arrays, indices, slicing, two-pointer and sliding window.", content:`<h2>Array Basics</h2><pre><code># O(1) access by index\narr = [10, 20, 30, 40, 50]\nprint(arr[0])   # 10\nprint(arr[-1])  # 50</code></pre><h2>Two Pointers</h2><pre><code>def two_sum(arr, target):\n    l, r = 0, len(arr)-1\n    while l < r:\n        if arr[l]+arr[r]==target: return [l,r]\n        elif arr[l]+arr[r]<target: l+=1\n        else: r-=1</code></pre>` }),
    note({ order:2,  isPremium:false, readTime:8,  title:"Hash Maps & Sets",                    slug:"dsa-hashmaps",     summary:"O(1) lookups to solve problems that would otherwise be O(n²).", content:`<h2>Two Sum with Hash Map</h2><pre><code>def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target-n in seen: return [seen[target-n], i]\n        seen[n] = i</code></pre>` }),
    note({ order:3,  isPremium:false, readTime:8,  title:"Sliding Window",                      slug:"dsa-sliding",      summary:"Efficiently process subarrays in O(n) instead of O(n²).", content:`<h2>Sliding Window</h2><pre><code>def max_sum(arr, k):\n    win = sum(arr[:k])\n    best = win\n    for i in range(k, len(arr)):\n        win += arr[i] - arr[i-k]\n        best = max(best, win)\n    return best</code></pre>` }),
    note({ order:4,  isPremium:false, readTime:8,  title:"Binary Search",                       slug:"dsa-binary",       summary:"O(log n) search — the template and common variations.", content:`<h2>Template</h2><pre><code>def binary_search(arr, target):\n    lo, hi = 0, len(arr)-1\n    while lo <= hi:\n        mid = (lo+hi)//2\n        if arr[mid]==target: return mid\n        elif arr[mid]<target: lo=mid+1\n        else: hi=mid-1\n    return -1</code></pre>` }),
    note({ order:5,  isPremium:false, readTime:10, title:"Stacks & Queues",                     slug:"dsa-stacks",       summary:"Stack (LIFO) and Queue (FIFO) — patterns and problems.", content:`<h2>Stack</h2><pre><code>stack = []\nstack.append(1)   # push\nstack.append(2)\nprint(stack.pop()) # 2 (LIFO)</code></pre><h2>Queue</h2><pre><code>from collections import deque\nq = deque()\nq.append(1)      # enqueue\nq.popleft()      # dequeue (FIFO)</code></pre>` }),
    note({ order:6,  isPremium:false, readTime:10, title:"Linked Lists",                        slug:"dsa-linked",       summary:"Singly and doubly linked lists — structure, traversal and operations.", content:`<h2>Node</h2><pre><code>class Node:\n    def __init__(self, val):\n        self.val  = val\n        self.next = None</code></pre>` }),
    note({ order:7,  isPremium:false, readTime:12, title:"Trees — BFS & DFS",                   slug:"dsa-trees",        summary:"Binary trees, BFS, DFS, and common tree problems.", content:`<h2>DFS Traversals</h2><pre><code>def inorder(root):\n    if not root: return []\n    return inorder(root.left) + [root.val] + inorder(root.right)</code></pre>` }),
    note({ order:8,  isPremium:false, readTime:10, title:"Recursion & Dynamic Programming",     slug:"dsa-dp",           summary:"Break problems into subproblems with recursion, optimize with memoization.", content:`<h2>Fibonacci — Memoized</h2><pre><code>from functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)</code></pre>` }),
    note({ order:9,  isPremium:false, readTime:10, title:"Graph Algorithms",                    slug:"dsa-graphs",       summary:"BFS and DFS on graphs — shortest path and connected components.", content:`<h2>BFS</h2><pre><code>from collections import deque\ndef bfs(graph, start):\n    visited = {start}\n    q = deque([start])\n    while q:\n        node = q.popleft()\n        for nb in graph[node]:\n            if nb not in visited:\n                visited.add(nb); q.append(nb)</code></pre>` }),
    note({ order:10, isPremium:false, readTime:10, title:"Sorting Algorithms",                  slug:"dsa-sorting",      summary:"Bubble, merge, quick sort — with complexity analysis.", content:`<h2>Merge Sort — O(n log n)</h2><pre><code>def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr)//2\n    L = merge_sort(arr[:mid])\n    R = merge_sort(arr[mid:])\n    return merge(L, R)</code></pre>` }),
    note({ order:11, isPremium:true, readTime:15, title:"Advanced DP — LCS, LIS, Knapsack",    slug:"dsa-adv-dp",      summary:"Classic DP problems with optimal solutions.", content:`<h2>Premium</h2>` }),
    note({ order:12, isPremium:true, readTime:12, title:"Heaps & Priority Queues",              slug:"dsa-heaps",       summary:"Min/max heaps and their applications.", content:`<h2>Premium</h2>` }),
    note({ order:13, isPremium:true, readTime:12, title:"Tries & String Algorithms",            slug:"dsa-tries",       summary:"Prefix trees for efficient string search.", content:`<h2>Premium</h2>` }),
    note({ order:14, isPremium:true, readTime:12, title:"Advanced Graph — Dijkstra, MST",      slug:"dsa-adv-graph",   summary:"Shortest path and minimum spanning tree algorithms.", content:`<h2>Premium</h2>` }),
    note({ order:15, isPremium:true, readTime:25, title:"Top 50 DSA Interview Questions",      slug:"dsa-interview-50",summary:"Every DSA problem from FAANG interviews with solutions.", content:`<h2>Premium</h2>` }),
  ]);
  console.log("✅ DSA notes (15)");

  // OS — 10 notes
  await makeNotes(os.id, [
    note({ order:1,  isPremium:false, readTime:8,  title:"What is an Operating System?",       slug:"os-intro",         summary:"Role of OS, types and core responsibilities.", content:`<h2>OS Functions</h2><ul><li>Process management</li><li>Memory management</li><li>File system management</li><li>Device management</li><li>Security</li></ul>` }),
    note({ order:2,  isPremium:false, readTime:10, title:"Processes & Threads",                slug:"os-processes",     summary:"Process lifecycle, threads, and context switching.", content:`<h2>Process vs Thread</h2><p>A process is an independent program with its own memory. A thread is a unit of execution within a process — threads share memory.</p>` }),
    note({ order:3,  isPremium:false, readTime:12, title:"CPU Scheduling Algorithms",          slug:"os-scheduling",    summary:"FCFS, SJF, Round Robin and Priority scheduling explained.", content:`<h2>Algorithms</h2><ul><li>FCFS — First Come First Served</li><li>SJF — Shortest Job First</li><li>Round Robin — time quantum</li><li>Priority — highest priority runs first</li></ul>` }),
    note({ order:4,  isPremium:false, readTime:10, title:"Memory Management — Paging",         slug:"os-memory",        summary:"Virtual memory, paging, segmentation and page replacement.", content:`<h2>Paging</h2><p>Physical memory divided into frames. Logical memory into pages. Page table maps logical → physical.</p>` }),
    note({ order:5,  isPremium:false, readTime:10, title:"Deadlocks",                          slug:"os-deadlocks",     summary:"Conditions, prevention, avoidance and detection strategies.", content:`<h2>4 Conditions for Deadlock</h2><ol><li>Mutual exclusion</li><li>Hold and wait</li><li>No preemption</li><li>Circular wait</li></ol>` }),
    note({ order:6,  isPremium:false, readTime:8,  title:"Synchronization — Semaphores",      slug:"os-sync",          summary:"Race conditions, critical sections, semaphores and mutex.", content:`<h2>Race Condition</h2><p>When two threads access shared data simultaneously and result depends on timing.</p>` }),
    note({ order:7,  isPremium:false, readTime:8,  title:"File Systems",                       slug:"os-files",         summary:"File system structure, FAT, NTFS, ext4 and inodes.", content:`<h2>File System</h2><p>Organizes how data is stored on disk. Key concepts: inodes, directories, permissions.</p>` }),
    note({ order:8,  isPremium:false, readTime:8,  title:"I/O Management",                    slug:"os-io",            summary:"I/O systems, DMA, interrupts and device drivers.", content:`<h2>I/O</h2><p>OS manages communication between CPU and peripherals using device drivers and interrupts.</p>` }),
    note({ order:9,  isPremium:true,  readTime:12, title:"OS Security & Protection",           slug:"os-security",      summary:"Access control, privilege levels and security models.", content:`<h2>Premium</h2>` }),
    note({ order:10, isPremium:true,  readTime:20, title:"Top 30 OS Interview Questions",      slug:"os-interview",     summary:"Every OS question asked in system design interviews.", content:`<h2>Premium</h2>` }),
  ]);
  console.log("✅ OS notes (10)");

  // DBMS — 10 notes
  await makeNotes(dbms.id, [
    note({ order:1,  isPremium:false, readTime:8,  title:"DBMS Basics — What & Why",           slug:"dbms-intro",       summary:"Database concepts, DBMS vs file system, types of databases.", content:`<h2>What is DBMS?</h2><p>A DBMS is software that manages, stores and retrieves data efficiently with concurrency, security and backup.</p>` }),
    note({ order:2,  isPremium:false, readTime:10, title:"ER Model — Entity Relationship",     slug:"dbms-er",          summary:"Design databases with ER diagrams — entities, attributes, relationships.", content:`<h2>ER Components</h2><ul><li>Entity — a real-world object (User, Product)</li><li>Attribute — property of entity (name, age)</li><li>Relationship — how entities relate (User places Order)</li></ul>` }),
    note({ order:3,  isPremium:false, readTime:10, title:"Normalization — 1NF, 2NF, 3NF",      slug:"dbms-normalization",summary:"Remove data redundancy with normalization forms.", content:`<h2>1NF</h2><p>Atomic values — no repeating groups. Each cell has one value.</p><h2>2NF</h2><p>1NF + no partial dependency on composite key.</p><h2>3NF</h2><p>2NF + no transitive dependency.</p>` }),
    note({ order:4,  isPremium:false, readTime:8,  title:"Transactions & ACID",                slug:"dbms-acid",        summary:"Database transactions and ACID properties explained.", content:`<h2>ACID</h2><ul><li>Atomicity — all or nothing</li><li>Consistency — valid state</li><li>Isolation — no interference</li><li>Durability — committed = permanent</li></ul>` }),
    note({ order:5,  isPremium:false, readTime:8,  title:"Indexing & B-Trees",                 slug:"dbms-indexing",    summary:"How database indexes work — B-trees, clustered vs non-clustered.", content:`<h2>Index</h2><p>An index is a data structure that speeds up SELECT queries at the cost of slower writes and more storage.</p>` }),
    note({ order:6,  isPremium:false, readTime:10, title:"Concurrency Control",                slug:"dbms-concurrency", summary:"Locks, timestamps and MVCC for concurrent database access.", content:`<h2>Locking</h2><p>Two-phase locking (2PL) ensures serializability. Growing phase: acquire locks. Shrinking phase: release locks.</p>` }),
    note({ order:7,  isPremium:false, readTime:8,  title:"Recovery & Backup",                  slug:"dbms-recovery",    summary:"Crash recovery, WAL, checkpoints and backup strategies.", content:`<h2>WAL</h2><p>Write-Ahead Logging: log changes before applying them. Used for crash recovery.</p>` }),
    note({ order:8,  isPremium:false, readTime:10, title:"DBMS Interview Questions",            slug:"dbms-interview",   summary:"Most asked DBMS questions — keys, normalization, transactions.", content:`<h2>Common Questions</h2><ul><li>Primary key vs Foreign key vs Candidate key</li><li>DDL vs DML vs DCL</li><li>OLAP vs OLTP</li><li>Explain isolation levels</li></ul>` }),
    note({ order:9,  isPremium:true,  readTime:12, title:"Distributed Databases",              slug:"dbms-distributed", summary:"CAP theorem, distributed transactions and consensus algorithms.", content:`<h2>Premium</h2>` }),
    note({ order:10, isPremium:true,  readTime:20, title:"Top 30 DBMS Interview Questions",   slug:"dbms-interview-30",summary:"Complete DBMS interview preparation guide.", content:`<h2>Premium</h2>` }),
  ]);
  console.log("✅ DBMS notes (10)");

  // ─────────────────────────────────────────────────────────
  //  REACT.JS — 15 notes (3 sections × 5)
  // ─────────────────────────────────────────────────────────
  const reactNotes = await makeNotes(reactjs.id, [
    // ── Section 1: Foundations (order 1-5) ───────────────
    note({ order:1, isPremium:false, readTime:8,  title:"React Basics — What & Why",               slug:"react-intro",          summary:"What React is, why it exists, and how components work.",
      content:`<h2>What is React?</h2>
<p>React is a JavaScript library for building user interfaces. It was created by Facebook and is the most popular frontend library in 2024.</p>
<p>React's key ideas:</p>
<ul>
  <li><strong>Components</strong> — reusable pieces of UI</li>
  <li><strong>Declarative</strong> — describe what the UI should look like, React handles the DOM</li>
  <li><strong>Virtual DOM</strong> — React updates only what changed, making it fast</li>
</ul>

<h2>Your First Component</h2>
<pre><code>// A React component is just a function that returns JSX
function Greeting() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello, World!&lt;/h1&gt;
      &lt;p&gt;Welcome to React.&lt;/p&gt;
    &lt;/div&gt;
  );
}

export default Greeting;</code></pre>

<h2>JSX — JavaScript + XML</h2>
<p>JSX lets you write HTML-like syntax inside JavaScript. It's transformed to <code>React.createElement()</code> calls:</p>
<pre><code>// JSX
const el = &lt;h1 className="title"&gt;Hello&lt;/h1&gt;;

// What it compiles to:
const el = React.createElement("h1", { className: "title" }, "Hello");</code></pre>

<h2>Rules of JSX</h2>
<ul>
  <li>Use <code>className</code> instead of <code>class</code></li>
  <li>Self-close empty tags: <code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code></li>
  <li>Must return a single root element — wrap in <code>&lt;div&gt;</code> or <code>&lt;&gt;&lt;/&gt;</code></li>
</ul>` }),

    note({ order:2, isPremium:false, readTime:10, title:"Props — Passing Data to Components",       slug:"react-props",          summary:"How to pass and use props to make components reusable.",
      content:`<h2>What are Props?</h2>
<p>Props (short for properties) are how you pass data from a parent component to a child component. They make components reusable.</p>

<h2>Passing Props</h2>
<pre><code>// Parent passes props like HTML attributes
function App() {
  return (
    &lt;div&gt;
      &lt;UserCard name="Alice" age={25} isPremium={true} /&gt;
      &lt;UserCard name="Bob"   age={30} isPremium={false} /&gt;
    &lt;/div&gt;
  );
}

// Child receives props as an object
function UserCard({ name, age, isPremium }) {
  return (
    &lt;div className="card"&gt;
      &lt;h2&gt;{name}&lt;/h2&gt;
      &lt;p&gt;Age: {age}&lt;/p&gt;
      {isPremium &amp;&amp; &lt;span&gt;⭐ Premium&lt;/span&gt;}
    &lt;/div&gt;
  );
}</code></pre>

<h2>Default Props</h2>
<pre><code>function Button({ label = "Click me", color = "blue" }) {
  return &lt;button style={{ background: color }}&gt;{label}&lt;/button&gt;;
}</code></pre>

<h2>children Prop</h2>
<pre><code>function Card({ children, title }) {
  return (
    &lt;div className="card"&gt;
      &lt;h3&gt;{title}&lt;/h3&gt;
      {children}
    &lt;/div&gt;
  );
}

// Usage:
&lt;Card title="My Card"&gt;
  &lt;p&gt;This is the card content!&lt;/p&gt;
&lt;/Card&gt;</code></pre>` }),

    note({ order:3, isPremium:false, readTime:12, title:"useState — Managing Component State",      slug:"react-usestate",       summary:"The useState hook for local component state — counter, forms, toggles.",
      content:`<h2>What is State?</h2>
<p>State is data that can change over time and causes the component to re-render when it changes. Unlike props (which come from outside), state lives inside the component.</p>

<h2>useState Syntax</h2>
<pre><code>import { useState } from "react";

function Counter() {
  // [currentValue, setter] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;+&lt;/button&gt;
      &lt;button onClick={() =&gt; setCount(count - 1)}&gt;-&lt;/button&gt;
      &lt;button onClick={() =&gt; setCount(0)}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>State with Objects</h2>
<pre><code>const [user, setUser] = useState({ name: "", email: "" });

// WRONG: mutating state directly
user.name = "Alice";  // ❌ does not trigger re-render

// CORRECT: create a new object
setUser({ ...user, name: "Alice" });  // ✅ spread + update</code></pre>

<h2>Toggle Pattern</h2>
<pre><code>const [isOpen, setIsOpen] = useState(false);

&lt;button onClick={() =&gt; setIsOpen(prev =&gt; !prev)}&gt;
  {isOpen ? "Close" : "Open"}
&lt;/button&gt;</code></pre>` }),

    note({ order:4, isPremium:false, readTime:10, title:"useEffect — Side Effects in React",        slug:"react-useeffect",      summary:"Run code on mount, update or cleanup with the useEffect hook.",
      content:`<h2>What is useEffect?</h2>
<p><code>useEffect</code> lets you run code as a side effect — fetching data, subscriptions, timers, or DOM manipulation — after the component renders.</p>

<h2>Syntax</h2>
<pre><code>import { useEffect, useState } from "react";

useEffect(() =&gt; {
  // code to run
}, [dependencies]); // dependency array controls when it runs</code></pre>

<h2>3 Modes</h2>
<pre><code>// 1. Run after EVERY render (no deps array)
useEffect(() =&gt; { console.log("Rendered!"); });

// 2. Run ONCE on mount (empty array)
useEffect(() =&gt; { console.log("Mounted!"); }, []);

// 3. Run when specific values change
useEffect(() =&gt; { console.log("Count changed:", count); }, [count]);</code></pre>

<h2>Fetch Data on Mount</h2>
<pre><code>function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() =&gt; {
    fetch("/api/users")
      .then(r =&gt; r.json())
      .then(data =&gt; setUsers(data));
  }, []); // [] = only run once

  return (
    &lt;ul&gt;
      {users.map(u =&gt; &lt;li key={u.id}&gt;{u.name}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
}</code></pre>

<h2>Cleanup Function</h2>
<pre><code>useEffect(() =&gt; {
  const id = setInterval(() =&gt; setCount(c =&gt; c + 1), 1000);

  // Return a cleanup function — runs on unmount
  return () =&gt; clearInterval(id);
}, []);</code></pre>` }),

    note({ order:5, isPremium:false, readTime:8,  title:"Lists & Conditional Rendering",           slug:"react-lists",          summary:"Render arrays with map(), use keys, and write conditional JSX.",
      content:`<h2>Rendering Lists</h2>
<p>Use JavaScript's <code>.map()</code> to render arrays in JSX. Always add a <code>key</code> prop — a unique identifier for each item.</p>

<pre><code>const fruits = ["Apple", "Banana", "Cherry"];

function FruitList() {
  return (
    &lt;ul&gt;
      {fruits.map((fruit, index) =&gt; (
        &lt;li key={index}&gt;{fruit}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

<h2>Keys — Why They Matter</h2>
<p>Keys help React identify which items changed, were added, or removed. Use a unique ID — not array index when possible.</p>
<pre><code>// Prefer using ID from data
{users.map(user =&gt; (
  &lt;UserCard key={user.id} user={user} /&gt;
))}</code></pre>

<h2>Conditional Rendering</h2>
<pre><code>// Method 1: && (short-circuit)
{isLoggedIn &amp;&amp; &lt;Dashboard /&gt;}

// Method 2: ternary
{isLoggedIn ? &lt;Dashboard /&gt; : &lt;Login /&gt;}

// Method 3: if statement (in function body)
function Page({ user }) {
  if (!user) return &lt;p&gt;Loading...&lt;/p&gt;;
  return &lt;Dashboard user={user} /&gt;;
}</code></pre>` }),

    // ── Section 2: Intermediate Hooks (order 6-10) ────────
    note({ order:6, isPremium:false, readTime:12, title:"Forms & Controlled Inputs",               slug:"react-forms",          summary:"Controlled vs uncontrolled components, form handling, and validation.",
      content:`<h2>Controlled Inputs</h2>
<p>In React, form inputs are "controlled" when their value is driven by state:</p>
<pre><code>function LoginForm() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop page reload
    console.log({ email, password });
  }

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        type="email"
        value={email}
        onChange={e =&gt; setEmail(e.target.value)}
        placeholder="Email"
      /&gt;
      &lt;input
        type="password"
        value={password}
        onChange={e =&gt; setPassword(e.target.value)}
        placeholder="Password"
      /&gt;
      &lt;button type="submit"&gt;Login&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>

<h2>Single State Object Pattern</h2>
<pre><code>const [form, setForm] = useState({ name: "", email: "", age: "" });

function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value });
}

&lt;input name="name"  value={form.name}  onChange={handleChange} /&gt;
&lt;input name="email" value={form.email} onChange={handleChange} /&gt;</code></pre>` }),

    note({ order:7, isPremium:false, readTime:10, title:"useRef & useContext",                    slug:"react-useref-context",  summary:"Access DOM nodes with useRef and share state with useContext.",
      content:`<h2>useRef</h2>
<p><code>useRef</code> gives you a mutable reference that persists across renders without causing re-renders. Common uses: DOM access, storing timers.</p>
<pre><code>import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  function focusIt() {
    inputRef.current.focus();
  }

  return (
    &lt;div&gt;
      &lt;input ref={inputRef} placeholder="Click button to focus" /&gt;
      &lt;button onClick={focusIt}&gt;Focus Input&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>useContext — Avoid Prop Drilling</h2>
<pre><code>import { createContext, useContext, useState } from "react";

// 1. Create context
const ThemeContext = createContext("light");

// 2. Provide it high up in the tree
function App() {
  const [theme, setTheme] = useState("light");
  return (
    &lt;ThemeContext.Provider value={theme}&gt;
      &lt;Toolbar /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}

// 3. Consume anywhere deep down
function Button() {
  const theme = useContext(ThemeContext);
  return &lt;button className={theme}&gt;Click me&lt;/button&gt;;
}</code></pre>` }),

    note({ order:8, isPremium:false, readTime:10, title:"Custom Hooks",                           slug:"react-custom-hooks",   summary:"Extract reusable stateful logic into your own custom hooks.",
      content:`<h2>What are Custom Hooks?</h2>
<p>Custom hooks are functions that start with <code>use</code> and can call other hooks. They let you extract and reuse stateful logic.</p>

<h2>useLocalStorage Hook</h2>
<pre><code>function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =&gt; {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  function set(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, set];
}

// Usage:
const [theme, setTheme] = useLocalStorage("theme", "light");</code></pre>

<h2>useFetch Hook</h2>
<pre><code>function useFetch(url) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() =&gt; {
    fetch(url)
      .then(r =&gt; r.json())
      .then(setData)
      .catch(setError)
      .finally(() =&gt; setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage:
const { data, loading, error } = useFetch("/api/users");</code></pre>` }),

    note({ order:9, isPremium:false, readTime:12, title:"React Router — Navigation",              slug:"react-router",         summary:"Client-side routing with React Router v6 — pages, params, navigate.",
      content:`<h2>Setup</h2>
<pre><code>npm install react-router-dom</code></pre>

<h2>Basic Routing</h2>
<pre><code>import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;nav&gt;
        &lt;Link to="/"&gt;Home&lt;/Link&gt;
        &lt;Link to="/about"&gt;About&lt;/Link&gt;
      &lt;/nav&gt;

      &lt;Routes&gt;
        &lt;Route path="/"       element={&lt;Home /&gt;}  /&gt;
        &lt;Route path="/about"  element={&lt;About /&gt;} /&gt;
        &lt;Route path="/user/:id" element={&lt;User /&gt;} /&gt;
        &lt;Route path="*"       element={&lt;NotFound /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/BrowserRouter&gt;
  );
}</code></pre>

<h2>URL Parameters</h2>
<pre><code>import { useParams, useNavigate } from "react-router-dom";

function User() {
  const { id }   = useParams();   // /user/42 → id = "42"
  const navigate = useNavigate();

  return (
    &lt;div&gt;
      &lt;h1&gt;User #{id}&lt;/h1&gt;
      &lt;button onClick={() =&gt; navigate(-1)}&gt;Go Back&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>` }),

    note({ order:10, isPremium:false, readTime:12, title:"State Management — Context vs Zustand", slug:"react-state-mgmt",     summary:"When to use local state, Context API, or Zustand for global state.",
      content:`<h2>When to Use What?</h2>
<ul>
  <li><strong>useState</strong> — local component state (a counter, form input)</li>
  <li><strong>useContext</strong> — shared state for a subtree (theme, auth user)</li>
  <li><strong>Zustand / Redux</strong> — global app state (cart, notifications)</li>
</ul>

<h2>Zustand Example</h2>
<pre><code>import { create } from "zustand";

// Define store
const useStore = create(set =&gt; ({
  count:     0,
  increment: () =&gt; set(state =&gt; ({ count: state.count + 1 })),
  reset:     () =&gt; set({ count: 0 }),
}));

// Use anywhere — no Provider needed!
function Counter() {
  const { count, increment, reset } = useStore();
  return (
    &lt;div&gt;
      &lt;p&gt;{count}&lt;/p&gt;
      &lt;button onClick={increment}&gt;+&lt;/button&gt;
      &lt;button onClick={reset}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>` }),

    // ── Section 3: Advanced (order 11-15, Premium) ────────
    note({ order:11, isPremium:true, readTime:15, title:"Performance — memo, useMemo, useCallback", slug:"react-performance",   summary:"Optimize React apps by preventing unnecessary re-renders.", content:`<h2>Premium Content</h2><p>React.memo, useMemo, useCallback and when to actually use them.</p>` }),
    note({ order:12, isPremium:true, readTime:12, title:"Next.js with React",                      slug:"react-nextjs",        summary:"File-based routing, SSR, SSG, and API routes in Next.js.", content:`<h2>Premium Content</h2>` }),
    note({ order:13, isPremium:true, readTime:12, title:"Testing React — Vitest & Testing Library", slug:"react-testing",      summary:"Write unit and integration tests for React components.", content:`<h2>Premium Content</h2>` }),
    note({ order:14, isPremium:true, readTime:15, title:"React Patterns — HOC, Render Props",      slug:"react-patterns",      summary:"Advanced component patterns used in real-world codebases.", content:`<h2>Premium Content</h2>` }),
    note({ order:15, isPremium:true, readTime:25, title:"Top 40 React Interview Questions",        slug:"react-interview",     summary:"Most asked React questions from Google, Amazon, and startups.", content:`<h2>Premium Content</h2>` }),
  ]);
  console.log("✅ React.js notes (15)");

  // ─────────────────────────────────────────────────────────
  //  COMPUTER NETWORKS — 15 notes (3 sections × 5)
  // ─────────────────────────────────────────────────────────
  const cnNotes = await makeNotes(cn.id, [
    // ── Section 1: Fundamentals (order 1-5) ──────────────
    note({ order:1, isPremium:false, readTime:8,  title:"Computer Networks — Introduction",        slug:"cn-intro",             summary:"What networks are, types of networks, LAN vs WAN vs MAN.",
      content:`<h2>What is a Computer Network?</h2>
<p>A computer network is a collection of computers and devices connected together to share resources and communicate.</p>

<h2>Types of Networks</h2>
<ul>
  <li><strong>LAN</strong> (Local Area Network) — small area, e.g., office, home. High speed, privately owned.</li>
  <li><strong>MAN</strong> (Metropolitan Area Network) — city-wide, e.g., cable TV network.</li>
  <li><strong>WAN</strong> (Wide Area Network) — country/global, e.g., the Internet.</li>
  <li><strong>PAN</strong> (Personal Area Network) — very short range, e.g., Bluetooth.</li>
</ul>

<h2>Network Topologies</h2>
<ul>
  <li><strong>Bus</strong> — all devices on one cable; simple but single point of failure</li>
  <li><strong>Star</strong> — all connect to central hub/switch; most common in LANs</li>
  <li><strong>Ring</strong> — devices in a circle; data travels in one direction</li>
  <li><strong>Mesh</strong> — every device connects to every other; very reliable</li>
</ul>

<h2>Bandwidth vs Latency</h2>
<ul>
  <li><strong>Bandwidth</strong> — maximum data transfer rate (Mbps/Gbps)</li>
  <li><strong>Latency</strong> — delay in ms for data to travel from source to destination</li>
  <li><strong>Throughput</strong> — actual data transferred per second (≤ bandwidth)</li>
</ul>` }),

    note({ order:2, isPremium:false, readTime:10, title:"OSI Model — 7 Layers Explained",          slug:"cn-osi",               summary:"The OSI reference model — each layer's role and real-world protocols.",
      content:`<h2>The OSI Model</h2>
<p>The Open Systems Interconnection model is a conceptual framework that standardizes how different systems communicate. It has 7 layers.</p>

<pre><code>┌─────────────────────────┐
│  7. Application Layer   │  HTTP, FTP, SMTP, DNS
├─────────────────────────┤
│  6. Presentation Layer  │  SSL/TLS, JPEG, MP4
├─────────────────────────┤
│  5. Session Layer       │  NetBIOS, RPC
├─────────────────────────┤
│  4. Transport Layer     │  TCP, UDP
├─────────────────────────┤
│  3. Network Layer       │  IP, ICMP, routers
├─────────────────────────┤
│  2. Data Link Layer     │  MAC, Ethernet, switches
├─────────────────────────┤
│  1. Physical Layer      │  cables, radio waves, bits
└─────────────────────────┘</code></pre>

<h2>Mnemonic</h2>
<p><strong>All People Seem To Need Data Processing</strong> (top to bottom: 7→1)</p>

<h2>Layer Roles</h2>
<ul>
  <li><strong>Physical</strong> — raw bits over medium (copper, fiber, radio)</li>
  <li><strong>Data Link</strong> — frames, MAC addressing, error detection (CRC)</li>
  <li><strong>Network</strong> — IP addressing, routing between networks</li>
  <li><strong>Transport</strong> — end-to-end reliability (TCP) or speed (UDP)</li>
  <li><strong>Application</strong> — protocols users interact with: HTTP, DNS, SMTP</li>
</ul>` }),

    note({ order:3, isPremium:false, readTime:12, title:"TCP/IP Model & IP Addressing",            slug:"cn-tcp-ip",            summary:"TCP/IP 4-layer model, IPv4, subnetting, and CIDR notation.",
      content:`<h2>TCP/IP Model</h2>
<p>The practical internet model with 4 layers (vs OSI's 7):</p>
<ul>
  <li><strong>Application</strong> — HTTP, DNS, FTP, SMTP</li>
  <li><strong>Transport</strong> — TCP, UDP</li>
  <li><strong>Internet</strong> — IP, ICMP, ARP</li>
  <li><strong>Network Access</strong> — Ethernet, WiFi</li>
</ul>

<h2>IPv4 Addressing</h2>
<p>IPv4 uses 32-bit addresses written as four octets:</p>
<pre><code>192.168.1.1  →  11000000.10101000.00000001.00000001
              (each number is 0-255)</code></pre>

<h2>IP Address Classes</h2>
<pre><code>Class A:  1.0.0.0    – 126.255.255.255  (large networks)
Class B:  128.0.0.0  – 191.255.255.255  (medium networks)
Class C:  192.0.0.0  – 223.255.255.255  (small networks)
</code></pre>

<h2>Subnetting & CIDR</h2>
<pre><code>192.168.1.0/24
          ↑ subnet mask: 24 bits = 255.255.255.0
          → 256 addresses, 254 usable hosts

192.168.1.0/25 → splits into 2 subnets of 128 addresses each</code></pre>

<h2>Private IP Ranges</h2>
<ul>
  <li>10.0.0.0/8 — Class A private</li>
  <li>172.16.0.0/12 — Class B private</li>
  <li>192.168.0.0/16 — Class C private (home routers)</li>
</ul>` }),

    note({ order:4, isPremium:false, readTime:10, title:"TCP vs UDP — Transport Layer",            slug:"cn-tcp-udp",           summary:"How TCP ensures reliable delivery and when to use UDP instead.",
      content:`<h2>TCP — Transmission Control Protocol</h2>
<p>TCP is connection-oriented and reliable. Before sending data, it establishes a connection using the <strong>3-way handshake</strong>:</p>
<pre><code>Client          Server
  |── SYN ──────→|   (I want to connect)
  |←── SYN-ACK ──|   (OK, I'm ready)
  |── ACK ──────→|   (Great, let's go)
  |               |
  |── DATA ──────→|
  |←── ACK ───────|</code></pre>

<h2>TCP Features</h2>
<ul>
  <li>Guaranteed delivery — lost packets are retransmitted</li>
  <li>In-order delivery — data arrives in the right sequence</li>
  <li>Flow control — receiver controls how fast sender sends</li>
  <li>Congestion control — slows down when network is congested</li>
</ul>

<h2>UDP — User Datagram Protocol</h2>
<p>UDP is connectionless — just fires packets and doesn't care if they arrive.</p>
<ul>
  <li>No handshake, no acknowledgements</li>
  <li>Faster and lower overhead than TCP</li>
  <li>Used for: video streaming, DNS, VoIP, gaming</li>
</ul>

<h2>TCP vs UDP Summary</h2>
<pre><code>Feature        TCP           UDP
Reliability    Guaranteed    Best-effort
Order          Preserved     Not preserved
Speed          Slower        Faster
Use case       HTTP, email   Video, DNS, games</code></pre>` }),

    note({ order:5, isPremium:false, readTime:8,  title:"DNS — How Domain Names Work",             slug:"cn-dns",               summary:"How DNS resolves domain names to IP addresses step by step.",
      content:`<h2>What is DNS?</h2>
<p>The Domain Name System is the internet's phone book. It translates human-readable names like <code>google.com</code> into IP addresses like <code>142.250.80.46</code>.</p>

<h2>DNS Resolution Steps</h2>
<pre><code>You type: www.google.com

1. Browser cache — already visited? Use cached IP
2. OS cache — check /etc/hosts and local cache
3. Recursive resolver (your ISP's DNS server)
4. Root nameserver → points to .com TLD nameserver
5. .com TLD nameserver → points to google's nameserver
6. google.com nameserver → returns 142.250.80.46
7. Browser connects to 142.250.80.46</code></pre>

<h2>DNS Record Types</h2>
<ul>
  <li><strong>A</strong> — domain → IPv4 address</li>
  <li><strong>AAAA</strong> — domain → IPv6 address</li>
  <li><strong>CNAME</strong> — alias to another domain</li>
  <li><strong>MX</strong> — mail server for domain</li>
  <li><strong>TXT</strong> — arbitrary text (used for SPF, DKIM)</li>
  <li><strong>NS</strong> — authoritative nameservers</li>
</ul>

<h2>TTL (Time To Live)</h2>
<p>DNS records have a TTL in seconds. After TTL expires, the record is re-fetched. Lower TTL = faster propagation but more DNS queries.</p>` }),

    // ── Section 2: Application Layer (order 6-10) ─────────
    note({ order:6, isPremium:false, readTime:10, title:"HTTP & HTTPS — Web Protocol",             slug:"cn-http",              summary:"HTTP methods, status codes, headers and how HTTPS adds security.",
      content:`<h2>HTTP — HyperText Transfer Protocol</h2>
<p>HTTP is the protocol used by browsers and servers to communicate. It's stateless — every request is independent.</p>

<h2>HTTP Methods</h2>
<pre><code>GET     /users        → fetch users (read only, no body)
POST    /users        → create a new user (body: JSON)
PUT     /users/1      → replace user 1 entirely
PATCH   /users/1      → partial update of user 1
DELETE  /users/1      → delete user 1</code></pre>

<h2>HTTP Status Codes</h2>
<pre><code>2xx — Success
  200 OK           → request succeeded
  201 Created      → resource created
  204 No Content   → success, no body

3xx — Redirect
  301 Moved Permanently
  302 Found (temporary redirect)

4xx — Client Error
  400 Bad Request  → invalid request
  401 Unauthorized → not authenticated
  403 Forbidden    → no permission
  404 Not Found    → resource doesn't exist

5xx — Server Error
  500 Internal Server Error
  503 Service Unavailable</code></pre>

<h2>HTTPS</h2>
<p>HTTPS = HTTP + TLS encryption. The TLS handshake establishes encrypted communication before any data is exchanged:</p>
<ol>
  <li>Server sends its SSL certificate (with public key)</li>
  <li>Client verifies certificate with CA</li>
  <li>Both agree on encryption keys</li>
  <li>All data is encrypted from here</li>
</ol>` }),

    note({ order:7, isPremium:false, readTime:10, title:"HTTP/1.1 vs HTTP/2 vs HTTP/3",            slug:"cn-http-versions",     summary:"Evolution of HTTP — multiplexing, header compression, and QUIC.",
      content:`<h2>HTTP/1.1 (1997)</h2>
<ul>
  <li>One request per TCP connection (unless keep-alive)</li>
  <li>Head-of-line blocking — next request waits for previous</li>
  <li>Plain text headers</li>
</ul>

<h2>HTTP/2 (2015)</h2>
<ul>
  <li><strong>Multiplexing</strong> — multiple requests over one TCP connection</li>
  <li><strong>Header compression</strong> (HPACK) — reduces overhead</li>
  <li><strong>Server push</strong> — server can send resources before browser asks</li>
  <li>Binary protocol (faster to parse)</li>
</ul>

<h2>HTTP/3 (2022)</h2>
<ul>
  <li>Uses <strong>QUIC</strong> (UDP-based) instead of TCP</li>
  <li>Eliminates TCP head-of-line blocking</li>
  <li>Faster connection setup (0-RTT for returning visitors)</li>
  <li>Better on unreliable networks (mobile)</li>
</ul>

<pre><code>Protocol   Transport   Multiplexing   HoL Blocking
HTTP/1.1   TCP         No             Yes (bad)
HTTP/2     TCP         Yes            Yes (TCP level)
HTTP/3     QUIC(UDP)   Yes            No</code></pre>` }),

    note({ order:8, isPremium:false, readTime:8,  title:"IP Routing & NAT",                        slug:"cn-routing",           summary:"How routers forward packets, routing tables, and NAT.",
      content:`<h2>Routing</h2>
<p>Routers forward packets based on destination IP. Each router has a routing table:</p>
<pre><code>Destination     Next Hop        Interface
192.168.1.0/24  directly        eth0
10.0.0.0/8      192.168.1.1     eth1
0.0.0.0/0       203.0.113.1     eth2  (default route)</code></pre>

<h2>Routing Protocols</h2>
<ul>
  <li><strong>RIP</strong> — distance vector, max 15 hops, simple but slow convergence</li>
  <li><strong>OSPF</strong> — link state, fast convergence, used in enterprise</li>
  <li><strong>BGP</strong> — path vector, used between ISPs to route the internet</li>
</ul>

<h2>NAT — Network Address Translation</h2>
<p>NAT lets many private IP devices share one public IP address:</p>
<pre><code>Private IPs (at home):          Public IP (your ISP):
192.168.1.2  ─┐
192.168.1.3  ─┼→  Router (NAT)  →  203.0.113.45  →  Internet
192.168.1.4  ─┘</code></pre>
<p>NAT maintains a table mapping (private IP:port) ↔ (public IP:port).</p>` }),

    note({ order:9, isPremium:false, readTime:8,  title:"Firewalls & Network Security Basics",    slug:"cn-security",          summary:"Firewalls, DMZ, VPN, and common network attacks explained.",
      content:`<h2>Firewall</h2>
<p>A firewall filters network traffic based on rules (source IP, destination port, protocol).</p>
<ul>
  <li><strong>Packet filter</strong> — stateless, checks each packet in isolation</li>
  <li><strong>Stateful firewall</strong> — tracks connection state, smarter</li>
  <li><strong>Application firewall (WAF)</strong> — understands HTTP, blocks SQL injection etc.</li>
</ul>

<h2>Common Network Attacks</h2>
<ul>
  <li><strong>DDoS</strong> — flood server with traffic from many sources</li>
  <li><strong>Man-in-the-Middle</strong> — intercept communication between two parties</li>
  <li><strong>ARP Spoofing</strong> — send fake ARP replies to redirect traffic</li>
  <li><strong>DNS Spoofing</strong> — return fake DNS responses</li>
  <li><strong>Port Scanning</strong> — probe open ports to find vulnerabilities</li>
</ul>

<h2>VPN</h2>
<p>A Virtual Private Network encrypts all traffic and routes it through a server in another location:</p>
<ul>
  <li>Encrypts traffic on untrusted networks (public WiFi)</li>
  <li>Hides your IP from websites</li>
  <li>Used by companies for remote work access</li>
</ul>` }),

    note({ order:10, isPremium:false, readTime:10, title:"WebSockets & Real-time Communication",   slug:"cn-websockets",        summary:"How WebSockets enable full-duplex communication vs HTTP polling.",
      content:`<h2>The Problem with HTTP for Real-time</h2>
<p>HTTP is request-response: the client must ask, the server replies. For chat apps or live dashboards, you'd need to poll constantly:</p>
<pre><code>// HTTP polling — inefficient
setInterval(() =&gt; fetch("/api/messages"), 1000);</code></pre>

<h2>WebSocket Protocol</h2>
<p>WebSocket provides a persistent, full-duplex connection. After an HTTP upgrade handshake, both sides can send at any time:</p>
<pre><code>// Client
const ws = new WebSocket("wss://example.com/chat");

ws.onopen    = ()    =&gt; ws.send("Hello server!");
ws.onmessage = (e)   =&gt; console.log("Received:", e.data);
ws.onerror   = (err) =&gt; console.error(err);
ws.onclose   = ()    =&gt; console.log("Disconnected");</code></pre>

<h2>HTTP vs WebSocket</h2>
<pre><code>Feature        HTTP              WebSocket
Direction      Client → Server   Both ways
Connection     New per request   Persistent
Overhead       High (headers)    Low after handshake
Use case       REST APIs         Chat, games, live data</code></pre>

<h2>Server-Sent Events (SSE)</h2>
<p>SSE is a lighter alternative for one-way server→client streams (dashboards, notifications). Uses regular HTTP.</p>` }),

    // ── Section 3: Advanced (order 11-15, Premium) ────────
    note({ order:11, isPremium:true, readTime:15, title:"Network Performance & CDN",               slug:"cn-performance",       summary:"Latency optimization, caching, CDNs, and load balancers.", content:`<h2>Premium Content</h2>` }),
    note({ order:12, isPremium:true, readTime:12, title:"IPv6 & Future of Networking",             slug:"cn-ipv6",              summary:"IPv6 addressing, migration from IPv4, and new features.", content:`<h2>Premium Content</h2>` }),
    note({ order:13, isPremium:true, readTime:12, title:"Wireless Networks — WiFi & 5G",           slug:"cn-wireless",          summary:"802.11 standards, WiFi security (WPA3), and 5G architecture.", content:`<h2>Premium Content</h2>` }),
    note({ order:14, isPremium:true, readTime:12, title:"Network Protocols Deep Dive",             slug:"cn-protocols-deep",    summary:"SMTP, FTP, SSH, DHCP and other essential protocols explained.", content:`<h2>Premium Content</h2>` }),
    note({ order:15, isPremium:true, readTime:20, title:"Top 35 Computer Networks Interview Qs",  slug:"cn-interview",         summary:"Every networking question from FAANG and product companies.", content:`<h2>Premium Content</h2>` }),
  ]);
  console.log("✅ Computer Networks notes (15)");

  // ─────────────────────────────────────────────────────────
  //  QUIZZES for Python Note 1
  // ─────────────────────────────────────────────────────────
  await prisma.quiz.createMany({
    data: [
      { noteId:pythonNotes[0].id, question:"What will type(42) return in Python?",                      options:JSON.stringify(["<class 'int'>","<class 'number'>","integer","int"]),               answer:0, explanation:"Python's type() returns the class type.", isPremium:false },
      { noteId:pythonNotes[0].id, question:"Which is the correct f-string syntax?",                     options:JSON.stringify(['f"Hello {name}"','"Hello {name}"','f("Hello "+name)','${name}']), answer:0, explanation:"f-strings use the f prefix and {} for expressions.", isPremium:false },
      { noteId:pythonNotes[0].id, question:"What does int('3.14') do?",                                  options:JSON.stringify(["Returns 3","Returns 3.14","Raises ValueError","Returns '3'"]),     answer:2, explanation:"int() can't convert a float string directly.", isPremium:false },
    ],
  });
  console.log("✅ Quizzes created");

  // ─────────────────────────────────────────────────────────
  //  PYQs — University & CBSE Question Papers
  // ─────────────────────────────────────────────────────────
  const pyqs = [
    // ── VTU ──────────────────────────────────────────────
    {
      title: "Data Structures & Algorithms — 3rd Sem (2024)",
      slug: "vtu-dsa-2024", university: "VTU", year: 2024, subject: "DSA", isPremium: false,
      questions: [
        { text: "Define a stack. Write a C program to implement a stack using arrays. Perform push, pop and display operations.", marks: 10, answer: "A stack is a linear data structure that follows LIFO (Last In First Out) principle. Operations: Push adds element to top, Pop removes from top.\n\nC Implementation:\n#include<stdio.h>\n#define MAX 100\nint stack[MAX], top = -1;\nvoid push(int val) { if(top==MAX-1) printf(\"Overflow\"); else stack[++top]=val; }\nint pop() { if(top==-1){ printf(\"Underflow\"); return -1; } return stack[top--]; }\nvoid display(){ for(int i=top;i>=0;i--) printf(\"%d \",stack[i]); }" },
        { text: "Explain Binary Search Tree (BST). Write algorithms for insertion and inorder traversal.", marks: 10, answer: "BST is a binary tree where: left child < parent < right child.\n\nInsertion:\n1. If tree is empty, create root.\n2. If key < root, go left; if key > root, go right.\n3. Repeat until NULL position found.\n\nInorder (Left-Root-Right) gives sorted output:\nvoid inorder(Node* root) { if(root){ inorder(root->left); printf(\"%d\",root->data); inorder(root->right); } }" },
        { text: "What is hashing? Explain open addressing and chaining collision resolution techniques with examples.", marks: 10, answer: "Hashing maps keys to array indices using a hash function h(k) = k mod m.\n\nCollision: Two keys map to same index.\n\nOpen Addressing — probe for next empty slot:\n- Linear probing: h(k,i) = (h(k)+i) mod m\n- Quadratic probing: h(k,i) = (h(k)+i²) mod m\n\nChaining — each slot is a linked list of entries. Insertion O(1), Search O(1) average. Load factor α = n/m should stay < 0.7 for performance." },
        { text: "Write Merge Sort algorithm. Trace it for the array: 38, 27, 43, 3, 9, 82, 10. State its time complexity.", marks: 10, answer: "Merge Sort — Divide and Conquer:\n1. Divide array into two halves\n2. Recursively sort each half\n3. Merge sorted halves\n\nTrace: [38,27,43,3,9,82,10]\nSplit → [38,27,43,3] | [9,82,10]\nSplit → [38,27] [43,3] | [9,82] [10]\nSort+Merge → [27,38] [3,43] | [9,82] [10]\nMerge → [3,27,38,43] | [9,10,82]\nFinal → [3,9,10,27,38,43,82]\n\nTime: O(n log n) all cases. Space: O(n)." },
        { text: "Explain graph representations: Adjacency Matrix and Adjacency List. Compare with examples.", marks: 6, answer: "Adjacency Matrix: 2D array A[i][j]=1 if edge (i,j) exists.\n- Space: O(V²), good for dense graphs\n- Edge check: O(1)\n\nAdjacency List: Array of linked lists, each list stores neighbors.\n- Space: O(V+E), good for sparse graphs\n- Edge check: O(degree)\n\nFor graph with 4 vertices and edges (1,2),(1,3),(2,4):\nMatrix: 4×4 with 1s at positions\nList: 1→[2,3], 2→[1,4], 3→[1], 4→[2]" },
        { text: "Define the following with examples: (i) AVL Tree (ii) B-Tree (iii) Heap (iv) Graph coloring", marks: 8, answer: "(i) AVL Tree: Self-balancing BST where |height(left)-height(right)| ≤ 1. Balance factor kept by rotations.\n(ii) B-Tree: Multi-way balanced tree. Order-m B-tree: max m children, min ⌈m/2⌉. Used in databases for disk-based indexing.\n(iii) Heap: Complete binary tree. Max-heap: parent ≥ children. Min-heap: parent ≤ children. Used in priority queues.\n(iv) Graph Coloring: Assign colors to vertices so no two adjacent vertices share a color. Chromatic number χ(G) = minimum colors needed." },
      ],
    },
    {
      title: "Operating Systems — 5th Sem (2024)",
      slug: "vtu-os-2024", university: "VTU", year: 2024, subject: "OS", isPremium: false,
      questions: [
        { text: "Explain the different states of a process with a neat diagram showing process state transitions.", marks: 10, answer: "Process States:\n1. New — process being created\n2. Ready — waiting to be assigned CPU\n3. Running — instructions being executed\n4. Waiting/Blocked — waiting for I/O or event\n5. Terminated — finished execution\n\nTransitions:\nNew→Ready: admitted\nReady→Running: scheduler dispatches\nRunning→Ready: interrupt / time quantum expires\nRunning→Waiting: I/O request\nWaiting→Ready: I/O completion\nRunning→Terminated: exit()" },
        { text: "Explain Banker's Algorithm for deadlock avoidance with a suitable example. What is a safe state?", marks: 10, answer: "Banker's Algorithm checks if granting a resource request keeps system in safe state.\n\nSafe State: A state where there exists a sequence <P1,P2,...,Pn> where each Pi's needs can be satisfied by available resources + resources held by processes before Pi.\n\nData structures: Available[], Max[][], Allocation[][], Need[][] where Need = Max - Allocation.\n\nSafety Algorithm:\n1. Work = Available, Finish[i]=false\n2. Find Pi where Finish[i]=false and Need[i]≤Work\n3. Work = Work + Allocation[i], Finish[i]=true\n4. Repeat until no such Pi or all Finish=true\n5. If all Finish=true → safe state" },
        { text: "Compare FCFS, SJF, Round Robin, and Priority CPU scheduling algorithms with examples.", marks: 10, answer: "FCFS (First Come First Serve):\n- Non-preemptive, simple\n- Convoy effect: short jobs wait for long ones\n- Example: P1(24ms), P2(3ms), P3(3ms) → Avg waiting = (0+24+27)/3 = 17ms\n\nSJF (Shortest Job First):\n- Optimal average waiting time\n- Requires knowing burst time in advance\n- Preemptive version = SRTF\n\nRound Robin:\n- Each process gets fixed time quantum (10-100ms)\n- Fair, good for time-sharing\n- Context switch overhead\n\nPriority:\n- Highest priority runs first\n- Starvation risk → solved by aging" },
        { text: "What is thrashing? How can it be detected and prevented? Explain the working set model.", marks: 10, answer: "Thrashing: Process spends more time paging than executing — CPU utilization drops drastically despite high multiprogramming.\n\nCause: Too many processes, each with insufficient frames → constant page faults.\n\nDetection: Monitor CPU utilization vs degree of multiprogramming. If utilization drops when adding processes → thrashing.\n\nPrevention:\n1. Working Set Model: track pages used in last Δ time units. Allocate frames = |working set|.\n2. Page Fault Frequency: if PFF > upper bound, give more frames; < lower bound, remove frames.\n3. Reduce multiprogramming degree." },
        { text: "Explain disk scheduling algorithms: FCFS, SSTF, SCAN. Given requests 98,183,37,122,14,124,65,67 and head at 53.", marks: 10, answer: "Request queue: 98,183,37,122,14,124,65,67. Head at 53.\n\nFCFS: 53→98→183→37→122→14→124→65→67\nTotal movement = 640 cylinders\n\nSSTF (Shortest Seek Time First): Always serve closest request.\n53→65→67→37→14→98→122→124→183 = 236 cylinders\n\nSCAN (Elevator): Move in one direction, serve all, reverse.\n53→65→67→98→122→124→183→37→14 = 208 cylinders\n\nSSTF has starvation risk. SCAN is better balanced." },
        { text: "Explain different page replacement algorithms: FIFO, Optimal, LRU. Illustrate with reference string: 7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1 with 3 frames.", marks: 10, answer: "FIFO — Replace oldest page. 15 page faults for given string with 3 frames.\n\nOptimal — Replace page not used for longest time in future. 9 page faults (theoretical minimum).\n\nLRU — Replace least recently used page. 12 page faults typically.\n\nFor reference string 7,0,1,2,0,3,...:\nFIFO: Load 7,0,1 then fault on 2 (replace 7), 0 hit, fault on 3 (replace 0), etc.\n\nLRU approximations: Counter method, Stack method, Second-chance algorithm." },
      ],
    },
    {
      title: "Database Management Systems — 4th Sem (2024)",
      slug: "vtu-dbms-2024", university: "VTU", year: 2024, subject: "DBMS", isPremium: false,
      questions: [
        { text: "Define DBMS. Compare DBMS with traditional file system. Explain 3-schema architecture.", marks: 10, answer: "DBMS: Software system for efficient organization, storage, retrieval, and management of data.\n\nDBMS vs File System:\n- Data redundancy: High in files, controlled in DBMS\n- Data inconsistency: Possible in files, avoided in DBMS\n- Data isolation: Files are isolated; DBMS provides unified access\n- Concurrent access: Difficult in files, handled by DBMS\n- Security: Limited in files, fine-grained in DBMS\n\n3-Schema Architecture:\n1. External (View) Level: User views\n2. Conceptual Level: Logical structure of entire DB\n3. Internal (Physical) Level: Physical storage\nData independence: changes at lower level don't affect higher level." },
        { text: "Explain functional dependencies and normalization up to 3NF and BCNF with examples.", marks: 10, answer: "Functional Dependency: X→Y means X determines Y.\n\n1NF: No repeating groups, atomic values.\n2NF: 1NF + no partial dependencies (all non-key attributes depend on full primary key).\n3NF: 2NF + no transitive dependencies (A→B→C where A is key, B is non-key, C is non-key — remove B→C).\nBCNF: For every FD X→Y, X must be a superkey.\n\nExample: Student(RollNo, Name, CourseID, CourseName, Marks)\nFDs: RollNo→Name, CourseID→CourseName, {RollNo,CourseID}→Marks\n2NF violation: CourseID→CourseName (partial)\nSolution: Split into Student(RollNo,Name), Course(CourseID,CourseName), Enrollment(RollNo,CourseID,Marks)" },
        { text: "Write SQL queries for: (a) Find employees earning more than their manager (b) Find 2nd highest salary (c) Display department-wise average salary.", marks: 10, answer: "(a) Employees earning more than manager:\nSELECT e.name FROM Employee e JOIN Employee m ON e.manager_id = m.emp_id WHERE e.salary > m.salary;\n\n(b) 2nd highest salary:\nSELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);\n-- Or using LIMIT:\nSELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1;\n\n(c) Department-wise average:\nSELECT dept_id, AVG(salary) as avg_sal FROM Employee GROUP BY dept_id ORDER BY avg_sal DESC;" },
        { text: "Explain ACID properties of transactions. What are the problems caused by concurrent transactions?", marks: 10, answer: "ACID Properties:\n- Atomicity: Transaction is all-or-nothing. Ensured by undo logs.\n- Consistency: DB moves from one valid state to another.\n- Isolation: Concurrent transactions don't interfere.\n- Durability: Committed transactions survive failures.\n\nConcurrency Problems:\n1. Dirty Read: T2 reads T1's uncommitted data; T1 rolls back.\n2. Non-repeatable Read: T2 reads same row twice, gets different values (T1 updated between reads).\n3. Phantom Read: T2's range query gets different rows (T1 inserted/deleted between queries).\n4. Lost Update: T1 and T2 both update, T1's update is lost.\n\nSolved by isolation levels: READ UNCOMMITTED < READ COMMITTED < REPEATABLE READ < SERIALIZABLE" },
        { text: "What is an E-R model? Draw an E-R diagram for a hospital management system.", marks: 10, answer: "E-R Model: Entity-Relationship Model represents data as entities (objects), attributes (properties), and relationships (associations).\n\nComponents:\n- Entity: Rectangle (PATIENT, DOCTOR, WARD)\n- Attribute: Ellipse (patient_id, name, dob)\n- Relationship: Diamond (ADMITS, TREATS, ASSIGNS)\n- Weak entity: Double rectangle\n\nHospital ER Diagram:\nPATIENT(patient_id[PK], name, dob, blood_group)\nDOCTOR(doc_id[PK], name, specialization, phone)\nWARD(ward_no[PK], ward_type, capacity)\n\nRelationships:\n- PATIENT --ADMITS--> WARD (many-to-one)\n- DOCTOR --TREATS--> PATIENT (many-to-many)\n- DOCTOR --ASSIGNED_TO--> WARD (many-to-one)" },
      ],
    },
    {
      title: "Computer Networks — 6th Sem (2023)",
      slug: "vtu-cn-2023", university: "VTU", year: 2023, subject: "CN", isPremium: false,
      questions: [
        { text: "Explain the OSI model with functions of each layer. How does it differ from TCP/IP model?", marks: 10, answer: "OSI 7 Layers (top to bottom):\n7. Application: User interface (HTTP, FTP, SMTP, DNS)\n6. Presentation: Data formatting, encryption, compression\n5. Session: Session management, synchronization\n4. Transport: End-to-end delivery, flow control (TCP, UDP)\n3. Network: Routing, logical addressing (IP, ICMP)\n2. Data Link: Framing, MAC addressing, error detection\n1. Physical: Bit transmission, cables, signals\n\nTCP/IP Model (4 layers):\n- Application (OSI 5,6,7)\n- Transport (OSI 4)\n- Internet/Network (OSI 3)\n- Network Access (OSI 1,2)\n\nKey Difference: OSI is theoretical reference model; TCP/IP is practical implementation. OSI has strict layer separation; TCP/IP allows layers to bypass each other." },
        { text: "Explain TCP 3-way handshake and connection termination. What is the purpose of TIME_WAIT state?", marks: 10, answer: "3-Way Handshake (Connection Establishment):\n1. Client → Server: SYN (seq=x) — client requests connection\n2. Server → Client: SYN+ACK (seq=y, ack=x+1) — server acknowledges\n3. Client → Server: ACK (ack=y+1) — connection established\n\nConnection Termination (4-way):\n1. Client → Server: FIN\n2. Server → Client: ACK\n3. Server → Client: FIN\n4. Client → Server: ACK\n\nTIME_WAIT State:\n- Client waits 2×MSL (Max Segment Lifetime ≈ 2 min) after sending final ACK\n- Reason 1: Final ACK may be lost; server retransmits FIN\n- Reason 2: Stale packets from old connection must expire before new connection on same port" },
        { text: "Explain subnetting. A class B network 172.16.0.0 is to be divided into 4 equal subnets. Find subnet mask, network addresses, and host ranges.", marks: 10, answer: "Subnetting: Dividing a network into smaller sub-networks to reduce broadcast domains and improve security.\n\nClass B: 172.16.0.0/16 — 16 bits for host\nFor 4 subnets: need 2 extra bits → /18\n\nSubnet mask: 255.255.192.0\n\nSubnet 1: 172.16.0.0/18  → hosts: 172.16.0.1 to 172.16.63.254\nSubnet 2: 172.16.64.0/18 → hosts: 172.16.64.1 to 172.16.127.254\nSubnet 3: 172.16.128.0/18→ hosts: 172.16.128.1 to 172.16.191.254\nSubnet 4: 172.16.192.0/18→ hosts: 172.16.192.1 to 172.16.255.254\n\nEach subnet has 2^14 - 2 = 16,382 usable hosts." },
        { text: "Explain DNS resolution process. What is the role of iterative vs recursive queries?", marks: 8, answer: "DNS (Domain Name System): Translates domain names to IP addresses.\n\nDNS Hierarchy: Root → TLD (.com, .in) → Authoritative NS → Local resolver\n\nResolution Process (for www.example.com):\n1. Browser checks local cache\n2. Query to local DNS resolver (ISP/Router)\n3. Resolver queries root name server → gets .com NS\n4. Resolver queries .com NS → gets example.com NS\n5. Resolver queries example.com NS → gets IP address\n6. Resolver caches and returns IP to client\n\nRecursive Query: Client asks resolver to do all work, get final answer.\nIterative Query: Resolver queries each server itself, getting referrals.\nLocal resolver uses recursive (client perspective); resolver-to-servers use iterative." },
        { text: "What is CSMA/CD? Explain Ethernet frame format and collision handling.", marks: 8, answer: "CSMA/CD (Carrier Sense Multiple Access / Collision Detection):\n\nAlgorithm:\n1. Listen before transmitting (Carrier Sense)\n2. If channel busy, wait. If free, transmit.\n3. While transmitting, monitor for collisions (Collision Detect)\n4. On collision: send jam signal, stop transmitting\n5. Wait random backoff time (Binary Exponential Backoff)\n6. Retry\n\nEthernet Frame Format:\n| Preamble (7B) | SFD (1B) | Dest MAC (6B) | Src MAC (6B) | Type/Length (2B) | Data (46-1500B) | FCS (4B) |\n\n- Preamble: synchronization (10101010...)\n- FCS: CRC-32 error detection\n- Min frame 64B enforces collision detectability" },
      ],
    },
    {
      title: "Design & Analysis of Algorithms — 5th Sem (2023)",
      slug: "vtu-daa-2023", university: "VTU", year: 2023, subject: "DAA", isPremium: true,
      questions: [
        { text: "Explain the divide and conquer paradigm. Apply it to Strassen's matrix multiplication. What is the time complexity improvement over the naive approach?", marks: 10, answer: "Divide & Conquer: Break problem into subproblems, solve recursively, combine results.\nT(n) = aT(n/b) + f(n) — solved by Master Theorem.\n\nNaive Matrix Multiplication: O(n³) — 8 multiplications for 2×2.\n\nStrassen's Algorithm (2×2 matrices A and B):\n7 multiplications instead of 8:\nM1 = (A11+A22)(B11+B22)\nM2 = (A21+A22)B11\nM3 = A11(B12-B22)\nM4 = A22(B21-B11)\nM5 = (A11+A12)B22\nM6 = (A21-A11)(B11+B12)\nM7 = (A12-A22)(B21+B22)\n\nT(n) = 7T(n/2) + O(n²)\nBy Master Theorem: T(n) = O(n^log₂7) ≈ O(n^2.807)\nImprovement: O(n^2.807) vs O(n³)", answer: "Premium answer — see above." },
        { text: "State and prove the 0/1 Knapsack problem using dynamic programming. Solve for items with weights [2,3,4,5] and values [3,4,5,6], capacity W=5.", marks: 10, answer: "0/1 Knapsack DP:\nRecurrence: K[i][w] = max(K[i-1][w], val[i] + K[i-1][w-wt[i]]) if wt[i]≤w, else K[i-1][w]\n\nItems: w=[2,3,4,5], v=[3,4,5,6], W=5\n\nDP Table (items × capacity 0-5):\n     0  1  2  3  4  5\n  0  0  0  0  0  0  0\n  1  0  0  3  3  3  3\n  2  0  0  3  4  4  7\n  3  0  0  3  4  5  7\n  4  0  0  3  4  5  7\n\nMax value = 7 (items 1 and 2: weight 2+3=5, value 3+4=7)\nTime: O(nW), Space: O(nW)" },
        { text: "Explain Dijkstra's shortest path algorithm. Find shortest paths from source vertex A for the given weighted graph. State its time complexity.", marks: 10, answer: "Dijkstra's Algorithm (single-source, non-negative weights):\n1. dist[src]=0, dist[all others]=∞\n2. Priority queue with (distance, vertex)\n3. Extract min-dist vertex u\n4. For each neighbor v of u: if dist[u]+w(u,v) < dist[v], update dist[v]\n5. Repeat until all vertices processed\n\nFor graph A→B(4), A→C(2), B→D(5), C→B(1), C→D(8), B→E(3), D→E(2):\ndist: A=0, C=2, B=3(via C), E=6(via B), D=8(via B)\nShortest paths: A→C→B→E, A→C→B→D\n\nTime: O((V+E) log V) with binary heap / O(V²) with array" },
        { text: "Explain NP, NP-Hard, and NP-Complete problem classes. Prove that SAT is NP-Complete (Cook's theorem overview).", marks: 10, answer: "P: Problems solvable in polynomial time (e.g., sorting, BFS).\nNP: Problems verifiable in polynomial time. Solution can be checked fast.\nNP-Hard: At least as hard as any NP problem. May not be in NP.\nNP-Complete: Both NP and NP-Hard. Hardest problems in NP.\n\nCook-Levin Theorem (SAT is NP-Complete):\n1. SAT ∈ NP: Given an assignment, check in O(n) time.\n2. Every NP problem reduces to SAT: For any NP machine M with input x, construct a boolean formula φ that is satisfiable iff M accepts x. φ encodes the computation tableau of M.\n\nConsequence: If SAT ∈ P, then P = NP.\nOther NP-Complete: 3-SAT, Vertex Cover, Hamiltonian Cycle, Traveling Salesman." },
      ],
    },

    // ── PIET ──────────────────────────────────────────────
    {
      title: "Programming Fundamentals in C — 1st Year (2024)",
      slug: "piet-c-2024", university: "PIET", year: 2024, subject: "C", isPremium: false,
      questions: [
        { text: "Explain the structure of a C program with a suitable example. What are tokens in C?", marks: 8, answer: "Structure of a C Program:\n1. Documentation section (comments)\n2. Preprocessor directives (#include, #define)\n3. Global declarations\n4. main() function\n5. User-defined functions\n\nExample:\n#include<stdio.h>  // preprocessor\nint max = 100;     // global\nint main() {\n    int a = 5;     // local variable\n    printf(\"%d\", a);\n    return 0;\n}\n\nTokens: Smallest units in C:\n- Keywords: int, float, if, for, return\n- Identifiers: variable names (max, a)\n- Literals: 100, 5, \"hello\"\n- Operators: +, -, *, /, =\n- Punctuation: {}, (), ;" },
        { text: "Write a C program to find whether a number is prime or not. Also find all prime numbers between 1 and 100 using Sieve of Eratosthenes.", marks: 10, answer: "Prime check:\n#include<stdio.h>\n#include<math.h>\nint isPrime(int n) {\n    if(n<2) return 0;\n    for(int i=2; i<=sqrt(n); i++)\n        if(n%i==0) return 0;\n    return 1;\n}\n\nSieve of Eratosthenes (all primes up to 100):\n#include<stdio.h>\nvoid sieve(int n) {\n    int prime[n+1];\n    for(int i=0;i<=n;i++) prime[i]=1;\n    prime[0]=prime[1]=0;\n    for(int i=2; i*i<=n; i++)\n        if(prime[i])\n            for(int j=i*i; j<=n; j+=i)\n                prime[j]=0;\n    for(int i=2;i<=n;i++)\n        if(prime[i]) printf(\"%d \",i);\n}" },
        { text: "Explain pointers in C. Write a program to swap two numbers using pointers and explain call by value vs call by reference.", marks: 10, answer: "Pointer: Variable that stores memory address of another variable.\nDeclaration: int *ptr;\nInitialization: ptr = &var;\nDereference: *ptr = value;\n\nSwap using pointers:\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\nint main() {\n    int x=5, y=10;\n    swap(&x, &y);  // pass addresses\n    printf(\"%d %d\", x, y);  // 10 5\n}\n\nCall by Value: Copy of value passed. Original unchanged.\nvoid f(int x) { x=100; }  // original unchanged\n\nCall by Reference: Address passed. Original changes.\nvoid f(int *x) { *x=100; }  // original changes" },
        { text: "What is a structure in C? Write a program to store and display records of 5 students (name, roll no, marks) using structure.", marks: 8, answer: "Structure: User-defined data type grouping different data types.\n\n#include<stdio.h>\nstruct Student {\n    char name[50];\n    int roll;\n    float marks;\n};\n\nint main() {\n    struct Student s[5];\n    for(int i=0; i<5; i++) {\n        printf(\"Enter name, roll, marks: \");\n        scanf(\"%s %d %f\", s[i].name, &s[i].roll, &s[i].marks);\n    }\n    printf(\"\\n--- Student Records ---\\n\");\n    for(int i=0; i<5; i++)\n        printf(\"%s\\t%d\\t%.2f\\n\", s[i].name, s[i].roll, s[i].marks);\n    return 0;\n}" },
        { text: "Explain different storage classes in C: auto, static, extern, register with examples.", marks: 8, answer: "1. auto (default): Local to block, destroyed after block ends.\nauto int x = 5;  // same as: int x = 5;\n\n2. static: Retains value between function calls. Initialized once.\nint count() {\n    static int c = 0;\n    return ++c;  // returns 1, 2, 3... on each call\n}\n\n3. extern: Global variable defined in another file.\nextern int globalVar;  // declaration only\n\n4. register: Stored in CPU register (hint only, compiler may ignore).\nregister int i;  // fast loop counter\n\nMemory locations:\nauto/register → Stack, static/extern → Data segment" },
      ],
    },
    {
      title: "Object Oriented Programming with C++ — 2nd Year (2024)",
      slug: "piet-cpp-2024", university: "PIET", year: 2024, subject: "C++", isPremium: false,
      questions: [
        { text: "Explain OOP concepts: encapsulation, inheritance, polymorphism, and abstraction with C++ examples.", marks: 10, answer: "1. Encapsulation: Bundling data and methods. Access via public/private/protected.\nclass BankAccount {\n    private: double balance;\n    public: void deposit(double amt) { balance += amt; }\n};\n\n2. Inheritance: Deriving new class from existing.\nclass Animal { public: void eat() { cout<<\"eating\"; } };\nclass Dog : public Animal { public: void bark() { cout<<\"woof\"; } };\n\n3. Polymorphism: Same interface, different behavior.\nclass Shape { public: virtual void draw() = 0; };\nclass Circle : public Shape { public: void draw() { cout<<\"Circle\"; } };\n\n4. Abstraction: Hide implementation, show interface.\nAbstract class with pure virtual functions. User knows what, not how." },
        { text: "What is operator overloading? Write a C++ program to overload + operator for complex number addition.", marks: 10, answer: "#include<iostream>\nusing namespace std;\nclass Complex {\n    float real, imag;\npublic:\n    Complex(float r=0, float i=0) : real(r), imag(i) {}\n    Complex operator+(const Complex& c) {\n        return Complex(real+c.real, imag+c.imag);\n    }\n    void display() {\n        cout << real;\n        if(imag >= 0) cout << \"+\";\n        cout << imag << \"i\" << endl;\n    }\n};\nint main() {\n    Complex c1(3.0, 4.0), c2(1.5, 2.5);\n    Complex c3 = c1 + c2;  // calls operator+\n    c3.display();  // 4.5+6.5i\n}" },
        { text: "Explain templates in C++. Write a function template for finding maximum of two values and a class template for a Stack.", marks: 10, answer: "Templates: Generic programming — write code that works with any data type.\n\nFunction Template:\ntemplate<typename T>\nT findMax(T a, T b) {\n    return (a > b) ? a : b;\n}\n// Usage: findMax(3,5) → 5, findMax(3.5,2.1) → 3.5\n\nClass Template:\ntemplate<typename T>\nclass Stack {\n    T arr[100];\n    int top = -1;\npublic:\n    void push(T val) { arr[++top] = val; }\n    T pop() { return arr[top--]; }\n    bool isEmpty() { return top == -1; }\n};\n// Usage:\nStack<int> intStack;\nStack<string> strStack;" },
        { text: "What is exception handling in C++? Explain try, catch, throw with a program that handles divide by zero and invalid input.", marks: 8, answer: "#include<iostream>\nusing namespace std;\n\ndouble divide(double a, double b) {\n    if(b == 0)\n        throw runtime_error(\"Division by zero!\");\n    if(a < 0 || b < 0)\n        throw invalid_argument(\"Negative numbers not allowed\");\n    return a / b;\n}\n\nint main() {\n    try {\n        cout << divide(10, 2) << endl;   // 5\n        cout << divide(10, 0) << endl;   // throws\n    }\n    catch(const runtime_error& e) {\n        cout << \"Runtime error: \" << e.what() << endl;\n    }\n    catch(const invalid_argument& e) {\n        cout << \"Invalid: \" << e.what() << endl;\n    }\n    catch(...) {\n        cout << \"Unknown exception\" << endl;\n    }\n}" },
        { text: "Explain virtual functions and pure virtual functions. How does late binding work in C++?", marks: 8, answer: "Virtual Function: Function declared in base class with 'virtual' keyword. Enables runtime polymorphism.\n\nLate Binding (Dynamic Dispatch): Function call resolved at runtime based on actual object type (using vtable).\n\nclass Animal {\npublic:\n    virtual void speak() { cout << \"Some sound\"; }  // virtual\n    virtual ~Animal() {}  // always virtual destructor\n};\nclass Dog : public Animal {\npublic:\n    void speak() override { cout << \"Woof!\"; }\n};\nAnimal* a = new Dog();\na->speak();  // Woof! — late binding calls Dog::speak\n\nPure Virtual Function: No implementation in base class. Makes class abstract.\nvirtual void speak() = 0;  // pure virtual\n// Class with pure virtual = abstract class (cannot instantiate)" },
      ],
    },
    {
      title: "Data Structures & Algorithms — 3rd Sem (2024)",
      slug: "piet-dsa-2024", university: "PIET", year: 2024, subject: "DSA", isPremium: false,
      questions: [
        { text: "Explain linked list. Write C programs to insert a node at beginning, end, and at given position in a singly linked list.", marks: 10, answer: "Linked List: Linear data structure where elements (nodes) contain data and a pointer to next node.\n\nNode structure:\nstruct Node { int data; struct Node* next; };\n\nInsert at beginning:\nvoid insertFront(struct Node** head, int val) {\n    struct Node* newNode = malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = *head;\n    *head = newNode;\n}\n\nInsert at end:\nvoid insertEnd(struct Node** head, int val) {\n    struct Node* newNode = malloc(sizeof(struct Node));\n    newNode->data = val; newNode->next = NULL;\n    if(!*head) { *head = newNode; return; }\n    struct Node* temp = *head;\n    while(temp->next) temp = temp->next;\n    temp->next = newNode;\n}" },
        { text: "What is a queue? Implement circular queue using arrays. Write enqueue and dequeue operations.", marks: 10, answer: "Queue: FIFO (First In First Out) data structure.\n\nCircular Queue (avoids wasted space):\n#define MAX 5\nint q[MAX], front=-1, rear=-1;\n\nvoid enqueue(int val) {\n    if((rear+1)%MAX == front) { printf(\"Full\"); return; }\n    if(front==-1) front=0;\n    rear = (rear+1) % MAX;\n    q[rear] = val;\n}\n\nint dequeue() {\n    if(front==-1) { printf(\"Empty\"); return -1; }\n    int val = q[front];\n    if(front==rear) front=rear=-1;  // last element\n    else front = (front+1) % MAX;\n    return val;\n}\n\nAdvantage: rear wraps around to front, reusing empty spaces after dequeue." },
        { text: "Explain Quick Sort. Trace Quick Sort on array: 64, 25, 12, 22, 11. Analyze best, average, and worst case complexity.", marks: 10, answer: "Quick Sort — Divide and Conquer:\n1. Choose pivot (last element here)\n2. Partition: elements < pivot go left, > pivot go right\n3. Recursively sort left and right sub-arrays\n\nTrace on [64, 25, 12, 22, 11]:\nPivot=11: partition → [11, 25, 12, 22, 64]\nLeft=[], Right=[25,12,22,64], Pivot=64 → [25,12,22,64]\nPivot=22: [12,22,25,64]\nPivot=25: [12,22,25,64]\nSorted: [11,12,22,25,64]\n\nComplexity:\n- Best case: O(n log n) — pivot always divides equally\n- Average: O(n log n)\n- Worst case: O(n²) — sorted array, always picks min/max as pivot\n- Space: O(log n) recursive stack\n\nIn practice fastest due to cache efficiency." },
        { text: "What are trees? Explain tree traversals (Preorder, Inorder, Postorder) with examples.", marks: 8, answer: "Tree: Non-linear hierarchical data structure.\nTerms: Root, parent, child, leaf, height, depth, degree.\n\nFor binary tree:\n       1\n      / \\\n     2   3\n    / \\\n   4   5\n\nPreorder (Root-Left-Right): 1, 2, 4, 5, 3\n- Visit root first → use for prefix expression, copying tree\n\nInorder (Left-Root-Right): 4, 2, 5, 1, 3\n- For BST → gives sorted output\n\nPostorder (Left-Right-Root): 4, 5, 2, 3, 1\n- Used for deletion, postfix expression\n\nLevel Order (BFS): 1, 2, 3, 4, 5\n- Uses queue\n\nvoid inorder(Node* root) {\n    if(root) { inorder(root->left); printf(\"%d\",root->data); inorder(root->right); }\n}" },
      ],
    },
    {
      title: "Database Management Systems — 4th Sem (2023)",
      slug: "piet-dbms-2023", university: "PIET", year: 2023, subject: "DBMS", isPremium: false,
      questions: [
        { text: "Write SQL queries: (a) Create tables for a library system (b) Insert 3 records (c) Find books issued more than 5 times (d) Delete overdue records.", marks: 10, answer: "(a) Create tables:\nCREATE TABLE Book(\n    book_id INT PRIMARY KEY,\n    title VARCHAR(100),\n    author VARCHAR(50),\n    isbn VARCHAR(20) UNIQUE\n);\nCREATE TABLE Issue(\n    issue_id INT PRIMARY KEY,\n    book_id INT REFERENCES Book(book_id),\n    member_id INT,\n    issue_date DATE,\n    return_date DATE,\n    due_date DATE\n);\n\n(b) INSERT INTO Book VALUES (1,'DBMS','Ramakrishnan','978-0-07-246563');\n\n(c) SELECT b.title, COUNT(*) cnt FROM Issue i JOIN Book b ON i.book_id=b.book_id GROUP BY b.book_id,b.title HAVING cnt > 5;\n\n(d) DELETE FROM Issue WHERE return_date IS NULL AND due_date < CURDATE();" },
        { text: "Explain different types of joins with examples: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN.", marks: 10, answer: "Given: Employee(id,name,dept_id) and Department(dept_id,dept_name)\n\nINNER JOIN — only matching rows from both tables:\nSELECT e.name, d.dept_name FROM Employee e INNER JOIN Department d ON e.dept_id=d.dept_id;\n-- Excludes employees without department and empty departments\n\nLEFT JOIN — all rows from left table + matching from right:\nSELECT e.name, d.dept_name FROM Employee e LEFT JOIN Department d ON e.dept_id=d.dept_id;\n-- Includes employees with no department (dept_name = NULL)\n\nRIGHT JOIN — all rows from right table + matching from left:\n-- Includes departments with no employees\n\nFULL OUTER JOIN — all rows from both tables:\n-- MySQL: use UNION of LEFT and RIGHT JOIN" },
        { text: "What is a transaction? Explain commit, rollback, savepoint. Write a PL/SQL block to transfer funds between accounts.", marks: 10, answer: "Transaction: Logical unit of work that is atomic — either fully completes or fully rolls back.\n\nCOMMIT: Makes changes permanent.\nROLLBACK: Undoes all changes since last commit.\nSAVEPOINT name: Creates a bookmark to rollback to.\nROLLBACK TO name: Undo only to savepoint.\n\nPL/SQL Fund Transfer:\nDECLARE\n    v_from INT := 101;\n    v_to   INT := 102;\n    v_amount DECIMAL := 5000;\nBEGIN\n    SAVEPOINT before_transfer;\n    UPDATE Account SET balance = balance - v_amount WHERE acc_id = v_from;\n    IF SQL%ROWCOUNT = 0 THEN RAISE_APPLICATION_ERROR(-20001,'From account not found'); END IF;\n    UPDATE Account SET balance = balance + v_amount WHERE acc_id = v_to;\n    COMMIT;\n    DBMS_OUTPUT.PUT_LINE('Transfer successful');\nEXCEPTION\n    WHEN OTHERS THEN\n        ROLLBACK TO before_transfer;\n        DBMS_OUTPUT.PUT_LINE('Transfer failed: ' || SQLERRM);\nEND;" },
        { text: "Explain indexing in databases. What is the difference between clustered and non-clustered index?", marks: 8, answer: "Index: Data structure (B+ tree or hash) that speeds up data retrieval at the cost of extra storage and slower writes.\n\nClustered Index:\n- Determines physical order of data in table\n- Only ONE per table (usually primary key)\n- Data rows stored in index order\n- Example: PRIMARY KEY automatically creates clustered index\n- Range queries very fast (adjacent data on disk)\n\nNon-Clustered Index:\n- Separate structure pointing to actual data rows\n- Multiple per table allowed\n- Pointer (row locator) stored in leaf nodes\n- Example: INDEX on email column\n\nWhen to use:\n- Clustered: Columns used in range queries, ORDER BY, frequent lookups by primary key\n- Non-clustered: Columns used in WHERE, JOIN, frequently searched but not the PK\n\nCovering index: Non-clustered index that includes all columns needed by a query (no row lookup needed)" },
      ],
    },
    {
      title: "Computer Networks — 5th Sem (2023)",
      slug: "piet-cn-2023", university: "PIET", year: 2023, subject: "CN", isPremium: true,
      questions: [
        { text: "Explain TCP congestion control mechanisms: slow start, congestion avoidance, fast retransmit, and fast recovery.", marks: 10, answer: "TCP Congestion Control:\n\n1. Slow Start:\n- Start with cwnd = 1 MSS\n- Double cwnd each RTT (exponential growth)\n- Stop when cwnd reaches ssthresh\n\n2. Congestion Avoidance:\n- cwnd increases by 1 MSS per RTT (linear growth)\n- Runs when cwnd ≥ ssthresh\n\n3. Congestion Detection:\n- Timeout: ssthresh = cwnd/2, cwnd = 1, restart slow start\n- 3 duplicate ACKs: ssthresh = cwnd/2, enter fast recovery (milder)\n\n4. Fast Retransmit: Retransmit lost segment immediately on 3 dup ACKs (don't wait for timeout)\n\n5. Fast Recovery:\n- ssthresh = cwnd/2\n- cwnd = ssthresh + 3 (additive increase from threshold)\n- Skip slow start, go straight to congestion avoidance" },
        { text: "Explain RSA encryption algorithm. Encrypt the message M=7 using public key (e=3, n=33).", marks: 10, answer: "RSA Algorithm:\n1. Choose primes p, q. Here p=3, q=11, n=pq=33\n2. φ(n) = (p-1)(q-1) = 2×10 = 20\n3. Choose e: gcd(e,φ(n))=1. e=3 works (gcd(3,20)=1)\n4. Find d: d×e ≡ 1 mod 20 → d=7 (7×3=21≡1 mod 20)\nPublic key: (e=3, n=33), Private key: (d=7, n=33)\n\nEncryption: C = M^e mod n = 7^3 mod 33\n7^3 = 343\n343 mod 33: 343 = 10×33 + 13 → C = 13\n\nDecryption: M = C^d mod n = 13^7 mod 33 = 7 ✓\n\nSecurity: Based on difficulty of factoring n into p and q." },
        { text: "Explain HTTPS and TLS handshake. How does certificate validation work? What is certificate pinning?", marks: 10, answer: "TLS Handshake (TLS 1.3 simplified):\n1. Client Hello: TLS version, cipher suites, random nonce\n2. Server Hello: Chosen cipher, certificate, server random\n3. Certificate Verification: Client validates cert against CA store\n4. Key Exchange: Client generates pre-master secret, encrypts with server public key\n5. Session Keys: Both derive symmetric keys from randoms + pre-master secret\n6. Finished: Both send MAC of entire handshake\n7. Encrypted data exchange begins\n\nCertificate Validation:\n- Check certificate is signed by trusted CA\n- Verify domain name matches (CN or SAN)\n- Check not expired, not revoked (OCSP/CRL)\n- Validate chain of trust to root CA\n\nCertificate Pinning:\n- App hard-codes expected certificate or public key hash\n- Rejects connections even with valid CA-signed cert if hash doesn't match\n- Prevents MITM with rogue CA certificates" },
        { text: "What is NAT? Explain different types of NAT: static, dynamic, and PAT (port address translation).", marks: 8, answer: "NAT (Network Address Translation): Modifies IP address in packet headers as they pass through router. Allows many private IPs to share one public IP.\n\nPrivate ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16\n\nStatic NAT: 1-to-1 mapping. Each private IP has dedicated public IP.\nUse: Servers that need to be reachable from internet.\n\nDynamic NAT: Pool of public IPs. Private IPs mapped to available public IP.\nMappings are temporary. Not suitable for servers.\n\nPAT (NAT Overload / Masquerade): Many-to-one. Multiple private IPs share single public IP using different port numbers.\n- 192.168.1.5:3452 ↔ 203.0.113.1:10001\n- 192.168.1.6:3452 ↔ 203.0.113.1:10002\nMost common form. Home routers use PAT.\n\nLimitation: NAT breaks end-to-end connectivity, complicates P2P applications." },
      ],
    },

    // ── KUK ───────────────────────────────────────────────
    {
      title: "Mathematics I — B.Tech 1st Sem (2024)",
      slug: "kuk-math-2024", university: "KUK", year: 2024, subject: "Math", isPremium: false,
      questions: [
        { text: "Find the rank of matrix A = [[1,2,3],[4,5,6],[7,8,9]] using row echelon form.", marks: 8, answer: "A = [[1,2,3],[4,5,6],[7,8,9]]\nR2 → R2 - 4R1: [[1,2,3],[0,-3,-6],[7,8,9]]\nR3 → R3 - 7R1: [[1,2,3],[0,-3,-6],[0,-6,-12]]\nR3 → R3 - 2R2: [[1,2,3],[0,-3,-6],[0,0,0]]\nRow echelon form has 2 non-zero rows.\nRank(A) = 2\n\nNote: det(A) = 1(45-48) - 2(36-42) + 3(32-35) = -3+12-9 = 0\nConfirmed: rank < 3, and rank = 2." },
        { text: "Evaluate the integral: ∫(x² + 3x + 2)/(x+1) dx. Also find ∫₀^π sin²x dx.", marks: 10, answer: "Part 1: ∫(x²+3x+2)/(x+1) dx\nFactor: x²+3x+2 = (x+1)(x+2)\n(x+1)(x+2)/(x+1) = x+2\n∫(x+2) dx = x²/2 + 2x + C\n\nPart 2: ∫₀^π sin²x dx\nUse identity: sin²x = (1-cos2x)/2\n∫₀^π (1-cos2x)/2 dx\n= [x/2 - sin2x/4]₀^π\n= (π/2 - sin(2π)/4) - (0 - 0)\n= π/2 - 0 = π/2" },
        { text: "State and prove Euler's theorem for homogeneous functions. If u = x³+y³/(x+y), find x(∂u/∂x) + y(∂u/∂y).", marks: 10, answer: "Euler's Theorem: If f(x,y) is homogeneous of degree n, then:\nx(∂f/∂x) + y(∂f/∂y) = n·f(x,y)\n\nProof: f(tx,ty) = t^n·f(x,y)\nDifferentiate w.r.t. t:\nx(∂f/∂(tx)) + y(∂f/∂(ty)) = n·t^(n-1)·f(x,y)\nSet t=1: x·fx + y·fy = n·f(x,y) ∎\n\nFor u = (x³+y³)/(x+y):\nu(tx,ty) = (t³x³+t³y³)/(tx+ty) = t²(x³+y³)/(x+y) = t²·u\nSo u is homogeneous of degree n=2.\nBy Euler's theorem: x(∂u/∂x) + y(∂u/∂y) = 2u = 2(x³+y³)/(x+y)" },
        { text: "Find the Laplace transform of: (i) t·sin(at) (ii) e^(-t)·cos(2t). Use first shifting theorem where applicable.", marks: 10, answer: "(i) L{t·sin(at)}:\nUsing L{t·f(t)} = -d/ds[F(s)] where F(s) = L{sin(at)} = a/(s²+a²)\n= -d/ds[a/(s²+a²)]\n= -a·(-2s)/(s²+a²)²\n= 2as/(s²+a²)²\n\n(ii) L{e^(-t)·cos(2t)}:\nFirst shifting theorem: L{e^(at)f(t)} = F(s-a)\nL{cos(2t)} = s/(s²+4)\nL{e^(-t)cos(2t)} = (s+1)/((s+1)²+4) = (s+1)/(s²+2s+5)" },
        { text: "Solve the differential equation: dy/dx + y·tan(x) = sin(2x).", marks: 8, answer: "This is a first-order linear ODE: dy/dx + P(x)y = Q(x)\nP(x) = tan(x), Q(x) = sin(2x) = 2sin(x)cos(x)\n\nIntegrating Factor: IF = e^∫P dx = e^∫tan(x)dx = e^(ln|sec x|) = sec(x)\n\nMultiply both sides by IF:\n(d/dx)[y·sec(x)] = 2sin(x)cos(x)·sec(x) = 2sin(x)\n\nIntegrate:\ny·sec(x) = ∫2sin(x)dx = -2cos(x) + C\ny = -2cos(x)/sec(x) + C·cos(x)\ny = -2cos²(x) + C·cos(x)" },
      ],
    },
    {
      title: "Programming in C — 1st Year (2024)",
      slug: "kuk-c-2024", university: "KUK", year: 2024, subject: "C", isPremium: false,
      questions: [
        { text: "Explain decision making statements in C: if, if-else, nested if, switch. Write a program to find the largest among three numbers.", marks: 10, answer: "if: Single condition\nif(condition) { statements; }\n\nif-else: Two branches\nif(condition) { ... } else { ... }\n\nNested if: Multiple conditions\nif(a>b && a>c) max=a;\nelse if(b>c) max=b;\nelse max=c;\n\nswitch: Multiple values\nswitch(ch) { case 'A': ...; break; default: ...; }\n\nLargest of three:\n#include<stdio.h>\nint main() {\n    float a, b, c;\n    printf(\"Enter 3 numbers: \");\n    scanf(\"%f %f %f\", &a, &b, &c);\n    if(a>=b && a>=c) printf(\"Largest: %.2f\", a);\n    else if(b>=a && b>=c) printf(\"Largest: %.2f\", b);\n    else printf(\"Largest: %.2f\", c);\n}" },
        { text: "Write C programs for: (i) Fibonacci series up to n terms (ii) Check palindrome (iii) Reverse a string without using strrev().", marks: 10, answer: "(i) Fibonacci:\nint main() {\n    int n, a=0, b=1, c;\n    scanf(\"%d\",&n);\n    printf(\"%d %d \",a,b);\n    for(int i=2;i<n;i++) { c=a+b; printf(\"%d \",c); a=b; b=c; }\n}\n\n(ii) Palindrome:\nint isPalindrome(int n) {\n    int rev=0, orig=n;\n    while(n>0) { rev=rev*10+n%10; n/=10; }\n    return orig==rev;\n}\n\n(iii) Reverse string:\n#include<string.h>\nvoid reverse(char s[]) {\n    int len=strlen(s);\n    for(int i=0,j=len-1;i<j;i++,j--) {\n        char temp=s[i]; s[i]=s[j]; s[j]=temp;\n    }\n}" },
        { text: "Explain arrays in C. Write programs: (i) Linear search (ii) Binary search (iii) Bubble sort on an array of 10 elements.", marks: 10, answer: "(i) Linear Search — O(n):\nint linearSearch(int a[], int n, int key) {\n    for(int i=0;i<n;i++) if(a[i]==key) return i;\n    return -1;\n}\n\n(ii) Binary Search — O(log n), requires sorted array:\nint binarySearch(int a[], int n, int key) {\n    int lo=0, hi=n-1;\n    while(lo<=hi) {\n        int mid=(lo+hi)/2;\n        if(a[mid]==key) return mid;\n        else if(a[mid]<key) lo=mid+1;\n        else hi=mid-1;\n    }\n    return -1;\n}\n\n(iii) Bubble Sort — O(n²):\nvoid bubbleSort(int a[], int n) {\n    for(int i=0;i<n-1;i++)\n        for(int j=0;j<n-i-1;j++)\n            if(a[j]>a[j+1]) {\n                int t=a[j]; a[j]=a[j+1]; a[j+1]=t;\n            }\n}" },
      ],
    },
    {
      title: "Data Structures Using C — 2nd Year (2024)",
      slug: "kuk-ds-2024", university: "KUK", year: 2024, subject: "DS", isPremium: false,
      questions: [
        { text: "Explain doubly linked list. Write algorithms to insert and delete a node at a specified position.", marks: 10, answer: "Doubly Linked List: Each node has two pointers — prev and next.\nstruct DNode { int data; struct DNode *prev, *next; };\n\nInsert at position p:\nvoid insertAt(struct DNode** head, int val, int pos) {\n    struct DNode* newNode = malloc(sizeof(struct DNode));\n    newNode->data = val;\n    if(pos==1) {\n        newNode->prev=NULL; newNode->next=*head;\n        if(*head) (*head)->prev=newNode;\n        *head=newNode; return;\n    }\n    struct DNode* curr=*head;\n    for(int i=1;i<pos-1&&curr;i++) curr=curr->next;\n    newNode->next=curr->next; newNode->prev=curr;\n    if(curr->next) curr->next->prev=newNode;\n    curr->next=newNode;\n}\n\nDelete at position:\nvoid deleteAt(struct DNode** head, int pos) {\n    struct DNode* curr=*head;\n    for(int i=1;i<pos;i++) curr=curr->next;\n    if(curr->prev) curr->prev->next=curr->next;\n    if(curr->next) curr->next->prev=curr->prev;\n    if(pos==1) *head=curr->next;\n    free(curr);\n}" },
        { text: "Write BFS and DFS traversal algorithms for a graph. Apply both on a graph with vertices A,B,C,D,E and edges AB,AC,BD,BE,CE.", marks: 10, answer: "Graph: A-B, A-C, B-D, B-E, C-E\nAdjacency: A:[B,C], B:[A,D,E], C:[A,E], D:[B], E:[B,C]\n\nBFS from A (uses queue):\nQueue: [A] → visit A\nQueue: [B,C] → visit B\nQueue: [C,D,E] → visit C\nQueue: [D,E,E] → visit D\n... → BFS order: A,B,C,D,E\n\nvoid BFS(int start, int V, int adj[V][V]) {\n    int visited[V]={0}, q[V], front=0, rear=0;\n    visited[start]=1; q[rear++]=start;\n    while(front<rear) {\n        int v=q[front++]; printf(\"%d \",v);\n        for(int i=0;i<V;i++)\n            if(adj[v][i]&&!visited[i]) { visited[i]=1; q[rear++]=i; }\n    }\n}\n\nDFS from A (uses stack/recursion):\nvoid DFS(int v, int visited[], int adj[][5], int V) {\n    visited[v]=1; printf(\"%d \",v);\n    for(int i=0;i<V;i++)\n        if(adj[v][i]&&!visited[i]) DFS(i,visited,adj,V);\n}\nDFS order: A,B,D,E,C" },
        { text: "Explain priority queue. Write a C program to implement a min-heap and perform heap sort.", marks: 10, answer: "Priority Queue: Elements served by priority, not insertion order.\nMin-Heap: Parent ≤ children. Root = minimum element.\n\nHeap representation (array): For index i:\n- Parent: (i-1)/2, Left: 2i+1, Right: 2i+2\n\nvoid heapify(int a[], int n, int i) {\n    int smallest=i, l=2*i+1, r=2*i+2;\n    if(l<n && a[l]<a[smallest]) smallest=l;\n    if(r<n && a[r]<a[smallest]) smallest=r;\n    if(smallest!=i) {\n        int t=a[i]; a[i]=a[smallest]; a[smallest]=t;\n        heapify(a,n,smallest);\n    }\n}\nvoid buildHeap(int a[], int n) {\n    for(int i=n/2-1;i>=0;i--) heapify(a,n,i);\n}\nvoid heapSort(int a[], int n) {\n    buildHeap(a,n);\n    for(int i=n-1;i>0;i--) {\n        int t=a[0]; a[0]=a[i]; a[i]=t;\n        heapify(a,i,0);\n    }\n}\nTime: O(n log n), Space: O(1) in-place" },
      ],
    },
    {
      title: "Discrete Mathematics — 3rd Sem (2023)",
      slug: "kuk-dm-2023", university: "KUK", year: 2023, subject: "DM", isPremium: false,
      questions: [
        { text: "State and prove De Morgan's laws. Verify using truth tables: (i) ¬(P∧Q) ≡ ¬P∨¬Q (ii) ¬(P∨Q) ≡ ¬P∧¬Q.", marks: 10, answer: "De Morgan's Laws:\n1. ¬(P∧Q) ≡ ¬P∨¬Q\n2. ¬(P∨Q) ≡ ¬P∧¬Q\n\nTruth Table for Law 1:\nP  Q  P∧Q  ¬(P∧Q)  ¬P  ¬Q  ¬P∨¬Q\nT  T   T     F      F   F    F  ✓\nT  F   F     T      F   T    T  ✓\nF  T   F     T      T   F    T  ✓\nF  F   F     T      T   T    T  ✓\nColumns ¬(P∧Q) and ¬P∨¬Q are identical → proved.\n\nApplications:\n- Logic circuit simplification\n- Set theory: (A∩B)' = A'∪B'\n- Complement of AND gate = NAND = OR of complements" },
        { text: "Explain different types of relations: reflexive, symmetric, transitive, equivalence. Give examples with 5-element sets.", marks: 10, answer: "Let A = {1,2,3,4,5}\n\nReflexive: (a,a) ∈ R for all a∈A\nR1 = {(1,1),(2,2),(3,3),(4,4),(5,5),(1,2)} — reflexive\n\nSymmetric: if (a,b)∈R then (b,a)∈R\nR2 = {(1,2),(2,1),(3,4),(4,3)} — symmetric\n\nAntisymmetric: if (a,b)∈R and (b,a)∈R then a=b\n≤ relation on integers is antisymmetric\n\nTransitive: if (a,b)∈R and (b,c)∈R then (a,c)∈R\nR3 = {(1,2),(2,3),(1,3)} — transitive\n\nEquivalence Relation = Reflexive + Symmetric + Transitive\nExample: Congruence modulo 3 on integers: a~b iff 3|(a-b)\nEquivalence classes: {0,3,6,...}, {1,4,7,...}, {2,5,8,...}" },
        { text: "State the Pigeonhole Principle. Apply it to prove: in any group of 13 people, at least 2 share the same birth month.", marks: 6, answer: "Pigeonhole Principle: If n+1 objects are placed in n boxes, then at least one box contains ≥ 2 objects.\n\nGeneralized: If n objects placed in k boxes, some box has at least ⌈n/k⌉ objects.\n\nProof for birth months:\n- 13 people = 13 'pigeons'\n- 12 months = 12 'boxes'\n- 13 > 12 → by Pigeonhole Principle, at least one month contains ≥ 2 people. ∎\n\nOther Applications:\n- Among any 5 integers, at least 2 have same remainder mod 4\n- In a group of 367 people, at least 2 share birthday (same date+month)\n- In any sequence of n²+1 distinct integers, there exists increasing or decreasing subsequence of length n+1 (Erdős–Szekeres)" },
        { text: "Explain planar graphs and Euler's formula for planar graphs. Is K₄ planar? Is K₅ planar? Justify.", marks: 10, answer: "Planar Graph: Can be drawn in a plane with no edges crossing.\n\nEuler's Formula: For connected planar graph: V - E + F = 2\nwhere V=vertices, E=edges, F=faces (including outer face)\n\nK₄ (complete graph on 4 vertices):\nV=4, E=6, F = 2-V+E = 2-4+6 = 4\nK₄ IS planar — can be drawn as triangle with one vertex inside.\nVerify: 4-6+4 = 2 ✓\n\nK₅ (complete graph on 5 vertices):\nV=5, E=10\nFor planar graphs: E ≤ 3V-6 = 3(5)-6 = 9\nBut E=10 > 9 → K₅ is NOT planar.\n\nK₃,₃ (bipartite): E ≤ 2V-4 = 2(6)-4 = 8, but K₃,₃ has E=9 → not planar.\nKuratowski's Theorem: A graph is planar iff it contains no subdivision of K₅ or K₃,₃." },
      ],
    },

    // ── CBSE 12th CS 2024 ─────────────────────────────────
    {
      title: "Computer Science — Class 12 (2024)",
      slug: "cbse-12-cs-2024", university: "CBSE", year: 2024, subject: "CS-12", isPremium: false,
      questions: [
        { text: "What is a Python dictionary? Write a program to count the frequency of each word in a given string.", marks: 5, answer: "Dictionary: Mutable, unordered collection of key-value pairs.\nSyntax: d = {'key': value}\nOperations: d['key'] (access), d['key']=val (insert/update), del d['key'] (delete), d.keys(), d.values(), d.items()\n\nWord frequency counter:\ntext = \"the quick brown fox jumps over the lazy dog the fox\"\nwords = text.split()\nfreq = {}\nfor word in words:\n    freq[word] = freq.get(word, 0) + 1\nfor word, count in sorted(freq.items()):\n    print(f'{word}: {count}')\n# Output: dog:1, fox:2, the:3, ..." },
        { text: "Explain the concept of inheritance in Python. Write a program demonstrating single and multiple inheritance.", marks: 5, answer: "Inheritance: Child class inherits attributes and methods from parent class.\n\nSingle Inheritance:\nclass Vehicle:\n    def __init__(self, brand, speed):\n        self.brand = brand\n        self.speed = speed\n    def display(self): print(f'{self.brand}: {self.speed}km/h')\n\nclass Car(Vehicle):\n    def __init__(self, brand, speed, seats):\n        super().__init__(brand, speed)\n        self.seats = seats\n    def info(self): print(f'Seats: {self.seats}')\n\nMultiple Inheritance:\nclass A:\n    def hello(self): print('Hello from A')\nclass B:\n    def hi(self): print('Hi from B')\nclass C(A, B):  # inherits from both A and B\n    pass\nc = C()\nc.hello()  # from A\nc.hi()     # from B" },
        { text: "Write Python programs to read a CSV file and display records with salary > 50000. Also write a program to create and write to a binary file.", marks: 5, answer: "CSV Read:\nimport csv\nwith open('employees.csv', 'r') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        if int(row['salary']) > 50000:\n            print(row['name'], row['salary'])\n\nBinary File Write:\nimport pickle\nstudents = [\n    {'name':'Alice', 'marks':90},\n    {'name':'Bob',   'marks':85}\n]\nwith open('students.pkl', 'wb') as f:\n    pickle.dump(students, f)\n\n# Read binary file:\nwith open('students.pkl', 'rb') as f:\n    data = pickle.load(f)\nfor s in data:\n    print(s['name'], s['marks'])" },
        { text: "Explain SQL: DDL vs DML vs DCL commands with examples. Write queries for a Student database: create table, insert, update, and a query using GROUP BY.", marks: 5, answer: "DDL (Data Definition Language): Define structure\nCREATE TABLE Student(id INT PRIMARY KEY, name VARCHAR(50), class VARCHAR(10), marks INT);\nALTER TABLE Student ADD COLUMN email VARCHAR(100);\nDROP TABLE Student;\n\nDML (Data Manipulation Language): Manipulate data\nINSERT INTO Student VALUES(1,'Alice','12A',95,'alice@mail.com');\nUPDATE Student SET marks=98 WHERE name='Alice';\nDELETE FROM Student WHERE marks<40;\n\nDCL (Data Control Language): Access control\nGRANT SELECT ON Student TO 'teacher';\nREVOKE SELECT ON Student FROM 'teacher';\n\nGROUP BY query:\nSELECT class, AVG(marks) avg_marks, COUNT(*) total\nFROM Student\nGROUP BY class\nHAVING AVG(marks) > 75\nORDER BY avg_marks DESC;" },
        { text: "What is a network protocol? Explain HTTP, FTP, SMTP, and POP3. What is the difference between IPv4 and IPv6?", marks: 5, answer: "Network Protocol: Set of rules for data communication between devices.\n\nHTTP (HyperText Transfer Protocol):\n- Port 80 (HTTP) / 443 (HTTPS)\n- Used for web browsing, stateless protocol\n- Methods: GET, POST, PUT, DELETE\n\nFTP (File Transfer Protocol):\n- Port 21 (control), 20 (data)\n- Used for file upload/download between client and server\n\nSMTP (Simple Mail Transfer Protocol):\n- Port 25/587\n- Sends emails from client to mail server, or server to server\n\nPOP3 (Post Office Protocol 3):\n- Port 110\n- Downloads emails from server to client, deletes from server\n- IMAP (143) is modern alternative — keeps mail on server\n\nIPv4 vs IPv6:\n- IPv4: 32-bit, 4.3 billion addresses (e.g., 192.168.1.1)\n- IPv6: 128-bit, 340 undecillion addresses (e.g., 2001:0db8::1)\n- IPv6 has built-in IPSec, no NAT needed, auto-configuration" },
        { text: "Explain cybersecurity threats: phishing, malware, ransomware. What precautions should be taken while using the internet?", marks: 5, answer: "Cybersecurity Threats:\n\nPhishing: Fake emails/websites that trick users into revealing credentials.\nPrevention: Check sender email, avoid clicking links, use 2FA.\n\nMalware: Malicious software (virus, worms, trojans, spyware).\n- Virus: Attaches to files, spreads when shared\n- Worm: Self-replicates over networks\n- Trojan: Disguised as legitimate software\nPrevention: Antivirus, don't download from untrusted sources.\n\nRansomware: Encrypts files, demands payment for decryption key.\nPrevention: Regular backups, patch OS, email security.\n\nGeneral Internet Safety:\n- Use HTTPS websites\n- Strong unique passwords + password manager\n- Enable two-factor authentication (2FA)\n- Keep software/OS updated\n- Don't use public Wi-Fi for sensitive tasks\n- Regular data backups (3-2-1 rule)\n- Be cautious with email attachments" },
      ],
    },
    // ── CBSE 10th IT 2024 ─────────────────────────────────
    {
      title: "Information Technology (Code 402) — Class 10 (2024)",
      slug: "cbse-10-it-2024", university: "CBSE", year: 2024, subject: "IT-10", isPremium: false,
      questions: [
        { text: "What is digital literacy? Explain the importance of digital skills in today's world with 5 examples.", marks: 5, answer: "Digital Literacy: Ability to use digital technologies effectively, safely, and ethically.\n\n5 Examples of Digital Skills:\n1. Internet Research: Using search engines, evaluating reliable sources\n2. Email Communication: Professional email writing, attachments, CC/BCC\n3. Spreadsheet Skills: Data entry, formulas, charts in MS Excel/Google Sheets\n4. Online Safety: Identifying phishing, safe browsing, privacy settings\n5. Digital Collaboration: Google Docs, online meetings, file sharing\n\nImportance:\n- Job market demands: 90%+ jobs require basic digital skills\n- Academic research and learning resources\n- Government services: Aadhaar, DigiLocker, UMANG app\n- Financial transactions: UPI, online banking, digital payments\n- Healthcare: Telemedicine, health apps, digital records" },
        { text: "Explain database concepts: field, record, table, primary key. Create a table structure for a school library system.", marks: 5, answer: "Database Concepts:\n- Field (Column): Single piece of data — Book_Title, Author, ISBN\n- Record (Row): Complete set of fields for one entity — all info about one book\n- Table: Collection of related records — Books table, Members table\n- Primary Key: Unique identifier for each record — Book_ID, Member_ID\n\nLibrary Database Structure:\nTable: Books\nField Name     | Data Type    | Size | Description\nBook_ID        | Number       | 6    | Primary Key\nTitle          | Text         | 100  | Book title\nAuthor         | Text         | 50   | Author name\nISBN           | Text         | 13   | Unique book code\nCategory       | Text         | 30   | Fiction, Science...\nAvailable      | Yes/No       | -    | Is it available?\n\nTable: Members\nMember_ID | Number — Primary Key\nName      | Text\nClass     | Text\nPhone     | Text" },
        { text: "What is a presentation software? Explain 5 features of MS PowerPoint that make presentations effective.", marks: 5, answer: "Presentation Software: Tool to create visual slideshows combining text, images, charts, and animations.\nExamples: MS PowerPoint, Google Slides, LibreOffice Impress.\n\n5 Key Features:\n1. Slide Layouts & Templates:\n   - Pre-designed layouts (Title, Content, Two-column)\n   - Professional themes maintain consistency\n\n2. Animations & Transitions:\n   - Animate objects to appear with effects (fly-in, fade)\n   - Slide transitions (wipe, dissolve) between slides\n\n3. SmartArt & Charts:\n   - Visualize processes, hierarchies, cycles\n   - Insert Excel charts directly\n\n4. Slide Master:\n   - Apply uniform formatting across all slides\n   - Change font/logo once, updates everywhere\n\n5. Presenter View:\n   - Speaker notes visible only to presenter\n   - Timer, upcoming slide preview\n   - Rehearse timings for auto-advance" },
        { text: "Explain the following HTML tags with examples: <table>, <form>, <iframe>, <audio>. Create an HTML page with a contact form.", marks: 5, answer: "<table> — displays tabular data:\n<table border='1'>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>Alice</td><td>15</td></tr>\n</table>\n\n<form> — collects user input:\n<form action='/submit' method='POST'>\n  <input type='text' name='name' placeholder='Your name'>\n  <input type='email' name='email'>\n  <input type='submit' value='Send'>\n</form>\n\n<iframe> — embeds another webpage:\n<iframe src='https://www.google.com' width='400' height='300'></iframe>\n\n<audio> — plays audio:\n<audio controls>\n  <source src='music.mp3' type='audio/mpeg'>\n</audio>\n\nContact Form:\n<!DOCTYPE html><html><body>\n<h2>Contact Us</h2>\n<form method='POST'>\n  Name: <input type='text' name='name' required><br>\n  Email: <input type='email' name='email' required><br>\n  Message: <textarea name='msg' rows='4'></textarea><br>\n  <input type='submit' value='Submit'>\n</form></body></html>" },
      ],
    },
    // ── Anna University ───────────────────────────────────
    {
      title: "Data Structures — CS3301 (2024)",
      slug: "anna-ds-2024", university: "Anna Uni", year: 2024, subject: "DS", isPremium: false,
      questions: [
        { text: "Define abstract data type (ADT). Explain LIST ADT and its operations. Implement array-based list.", marks: 13, answer: "ADT: Mathematical model defining a data type by its behavior (operations) rather than implementation.\n\nLIST ADT Operations:\n- Insert(X, P, L): Insert element X after position P in list L\n- Delete(P, L): Delete element at position P\n- Find(X, L): Returns position of X\n- Retrieve(P, L): Returns element at position P\n- MakeEmpty(L): Empties the list\n- First(L), Last(L): Returns first/last position\n\nArray Implementation:\n#define MAX 100\ntypedef struct {\n    int data[MAX];\n    int size;\n} List;\nvoid insert(List *L, int x, int pos) {\n    for(int i=L->size;i>=pos;i--) L->data[i]=L->data[i-1];\n    L->data[pos-1]=x;\n    L->size++;\n}\nTime: O(n) insert/delete (shifting), O(1) access." },
        { text: "Write and explain the algorithm for evaluating a postfix expression using stack. Evaluate: 6 2 3 + - 3 8 2 / + * 2 ^ 3 +", marks: 13, answer: "Postfix Evaluation Algorithm:\n1. Read expression left to right\n2. If operand → push to stack\n3. If operator → pop two operands, apply operator, push result\n4. End: stack top = result\n\nEvaluate: 6 2 3 + - 3 8 2 / + * 2 ^ 3 +\nToken  Stack\n6      [6]\n2      [6,2]\n3      [6,2,3]\n+      [6,5]        (2+3=5)\n-      [1]          (6-5=1)\n3      [1,3]\n8      [1,3,8]\n2      [1,3,8,2]\n/      [1,3,4]      (8/2=4)\n+      [1,7]        (3+4=7)\n*      [7]          (1*7=7)\n2      [7,2]\n^      [49]         (7^2=49)\n3      [49,3]\n+      [52]         (49+3=52)\nResult = 52" },
        { text: "Explain circular queue using linked list. Write C functions for enqueue and dequeue operations.", marks: 7, answer: "Circular Queue (Linked List): Last node's next points back to first node.\n\nstruct Node { int data; struct Node* next; };\nstruct Node* rear = NULL;  // single pointer sufficient\n\nvoid enqueue(int val) {\n    struct Node* newNode = malloc(sizeof(struct Node));\n    newNode->data = val;\n    if(rear == NULL) {\n        newNode->next = newNode;  // points to itself\n        rear = newNode;\n    } else {\n        newNode->next = rear->next;  // new→front\n        rear->next = newNode;         // old rear→new\n        rear = newNode;               // update rear\n    }\n}\n\nint dequeue() {\n    if(rear == NULL) { printf(\"Empty\"); return -1; }\n    struct Node* front = rear->next;\n    int val = front->data;\n    if(front == rear) rear = NULL;  // single element\n    else rear->next = front->next;\n    free(front);\n    return val;\n}" },
      ],
    },
    // ── AKTU ──────────────────────────────────────────────
    {
      title: "Programming in C — 1st Year (2024)",
      slug: "aktu-c-2024", university: "AKTU", year: 2024, subject: "C", isPremium: false,
      questions: [
        { text: "Explain operator precedence and associativity in C. Evaluate: (a) 5+3*2 (b) 2+8/4-1 (c) a=b=5 (d) 5>3 && 2<4 || 1==0.", marks: 8, answer: "Precedence (high to low): (), ++ --, * / %, + -, << >>, < > <= >=, == !=, &&, ||, ?: , =\nAssociativity: Most operators: left-to-right. Assignment, unary: right-to-left.\n\n(a) 5+3*2 = 5+6 = 11 (* before +)\n(b) 2+8/4-1 = 2+2-1 = 3 (/ before + and -)\n(c) a=b=5: Right-to-left → b=5 first, then a=5. Both equal 5.\n(d) 5>3 && 2<4 || 1==0\n    = T && T || F\n    = T || F  (&&  before ||)\n    = T (1)" },
        { text: "Write a C program using recursion to: (i) compute n! (ii) compute Fibonacci(n) (iii) compute GCD of two numbers.", marks: 10, answer: "#include<stdio.h>\n\n// (i) Factorial\nlong long factorial(int n) {\n    if(n<=1) return 1;\n    return n * factorial(n-1);\n}\n\n// (ii) Fibonacci\nint fib(int n) {\n    if(n<=1) return n;\n    return fib(n-1) + fib(n-2);\n}\n// Note: O(2^n) — use memoization for large n\n\n// (iii) GCD (Euclidean)\nint gcd(int a, int b) {\n    if(b==0) return a;\n    return gcd(b, a%b);\n}\n\nint main() {\n    printf(\"5! = %lld\\n\", factorial(5));   // 120\n    printf(\"fib(7) = %d\\n\", fib(7));       // 13\n    printf(\"gcd(48,18) = %d\\n\", gcd(48,18)); // 6\n}" },
        { text: "Explain 2D arrays. Write a program to multiply two 3×3 matrices and display the result.", marks: 10, answer: "2D Array: Array of arrays. Declaration: int mat[rows][cols];\nMemory: Stored row-major. mat[i][j] address = base + (i*cols+j)*sizeof(int)\n\n#include<stdio.h>\n#define N 3\nvoid matMul(int a[N][N], int b[N][N], int c[N][N]) {\n    for(int i=0;i<N;i++)\n        for(int j=0;j<N;j++) {\n            c[i][j]=0;\n            for(int k=0;k<N;k++)\n                c[i][j] += a[i][k] * b[k][j];\n        }\n}\nvoid print(int m[N][N]) {\n    for(int i=0;i<N;i++) {\n        for(int j=0;j<N;j++) printf(\"%4d\",m[i][j]);\n        printf(\"\\n\");\n    }\n}\nint main() {\n    int a[N][N]={{1,2,3},{4,5,6},{7,8,9}};\n    int b[N][N]={{9,8,7},{6,5,4},{3,2,1}};\n    int c[N][N];\n    matMul(a,b,c);\n    printf(\"Result:\\n\"); print(c);\n}\nTime Complexity: O(N³)" },
      ],
    },
  ];

  await prisma.pYQ.createMany({ data: pyqs });
  console.log(`✅ PYQs created (${pyqs.length} papers)`);

  const total = 20 + 20 + 15 + 15 + 10 + 15 + 15 + 10 + 10 + 15 + 15;
  console.log(`\n🎉 Done! Created:\n   12 topics\n   ${total} notes total\n   3 quizzes\n   ${pyqs.length} PYQ papers`);
  console.log("\n   Run: npx prisma studio — to view data");
}

main()
  .catch(e => { console.error("❌ Seed failed:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());