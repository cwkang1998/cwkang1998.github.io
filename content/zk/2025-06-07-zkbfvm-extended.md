+++
title = "Extending a ZK BrainfuckVM"
date = 2025-06-13
+++

During my time at the Coset Suzhou Hackerhouse, I teamed up with [Jeff](https://x.com/zk_foodchain) and [Harold](https://x.com/0xharoldgin) at the house, affectionately named ourselves the "BFBOYS", and worked on extending the functionality of a ZK BrainfuckVM as our project for the house. This article provides an overview of what we did.

## A brief walkthrough of Brainfuck

Before we dive into what we've done, first let's go through some preamble. What exactly is this "Brainfuck VM"? Does it somehow involve the defiling of a brain?

The "Brainfuck" that we are talking about here is actually a programming language. I'll let wikipedia provide some background on the language:

> Brainfuck is an esoteric programming language created in 1993 by Swiss student Urban Müller. Designed to be extremely minimalistic, the language consists of only eight simple commands, a data pointer, and an instruction pointer. - [https://en.wikipedia.org/wiki/Brainfuck](https://en.wikipedia.org/wiki/Brainfuck)

The eight simple commands here are as follows:

1. `+` -> increment the memory value at the pointer
2. `-` -> decrement the memory value at the pointer
3. `,` -> input a value and store at the pointer
4. `.` -> output the value at the current pointer
5. `>` -> move pointer to the right
6. `<` -> move pointer to the left
7. `[` -> jump past the matching `]` if value at pointer is 0
8. `]` -> jump back to matching `[` if value at pointer is not 0

Let's go into a simple example of a Brainfuck program:

```brainfuck
+ + + + + + [ > + + < - ] > > + + [ < - - > - ] < .
```

The program effectively performs the calculation of the following equation: `6 * 2 - 2 * 2 = ?`. Let's break it down:

1. Increment the value at pointer 0 6 times
2. Start the control statement with `[`, which
3. Move the pointer to pointer 1 and increment it twice
4. Move the pointer back to 0 and decrement it once
5. Since the value at pointer 0 is 5, which is > 0, jump to `[` (notice that this is a loop). Repeat until value at pointer 0 is 0.
6. Move pointer 2 times, to position 2 and increment it twice.
7. Start a new control statement with `[`.
8. Move pointer to position 1 and decrement it twice, then move pointer back to position 2 and decrement it once. Repeat until value at pointer 2 is 0.
9. Move pointer to to position 1 and output.

Although its quite verbose in order to perform a simple calculation, its simplicity makes it the perfect VM to ZK-ify.

## ZK BrainfuckVM (ZKBFVM)

Let's begin the process of ZK-ifying the BrainfuckVM. ZK-STARKS will be used for this implementation, and as such we have to make some changes to the VM to make it compatible with STARKs and thus making Brainfuck program provable through the VM.

We can roughly break down the high level steps to Zk-ify a BrainfuckVM to the following:

1. Produce a trace for the Brainfuck program
2. Convert the traces to tables
3. Defining the constraints on the tables
4. Encode the tables and their constraints into polynomials for proving

### 1. Produce a trace for the input Brainfuck program

The "trace" here refers to the execution trace for the Brainfuck program, or in other words, the record of the sequence of execution for the Brainfuck program. Let's look at an example:

Consider the following Brainfuck program:

```brainfuck
+ + [ > + + < - ] .
```

We want to generate the following trace:

```brainfuck
+ + [9 > + + < - ]2 > + + < - ]2 .
```

You may have notice that the trace we want to generate is essentially the same as the original program with a few important differences:

- there's a number behind the conditionals `[` and `]`
- all conditional branches are fully expanded

These differences makes the program we want to prove deterministic for a specific computation run; the same trace will always infer the same state at each step of the computation.

We will later be able to generate a ZK proof attesting to this trace, which in turn attests to the program. To be more specific, **an attestation to the computation trace is an attestation to a single run of the program, given a particular initial state**.

### 2. Convert the traces to tables

### 3. Defining the constraints on the tables

### 4. Convert the tables and their constraints into polynomials for proving

If you do a quick search on Google, you'll find that there's quite a few different tutorial and implementation for a Zk-fied BrainfuckVM. For this project we are using the implementation by Alan Szepieniec (`aszepieniec` is his github handle).

If you are interested in knowing more about the implementation, you can find the code for this implementation on `aszepieniec`'s [github repo](https://github.com/aszepieniec/stark-brainfuck), there's also articles written for this implementation that walks you through the details in more depth than I am doing here:

- [Neptune Cash Brainfuck STARK Tutorial](https://neptune.cash/learn/brainfuck-tutorial/)
- [Alan Szepieniec's BrainSTARK tutorial](https://aszepieniec.github.io/stark-brainfuck/)

I also did not cover the nitty gritty details on the proof system implementation for ZK-STARKs, but if you're interested in getting more context and understanding on it you can check out the [Anatomy of a STARK](https://aszepieniec.github.io/stark-anatomy/) article, which is a comprehensive tutorial also written by Alan.

## Extending the ZKBFVM: Adding a new unary operator

Let's start off by implementing a new unary operator like the current existing ones we have. Specifically we want to implement the `^` operator. Although the `^` operator is usually used to for either the bitwise XOR or the exponential operator, for the sake of simplicity here we are using it as a square(to take the power of 2) operator.

That is, when the VM encounters the unary operator `^`, it should take the value stored at the current pointer and multiply it by itself (square itself).

<!-- Go through what is in the talk -->

## Extending the ZKBFVM Part 2: Adding a binary operator

With the `^` operator implemented, let's try implementing something a little bit more complicated: a binary operator. The operator we decided to implement in this case is the multiply operator, `*`.

<!-- Go through what is in the talk -->

## Conclusion

There's some future plans(maybe) on further extending the VM to add more operators, or even to optimize for the proving speed, but for now this is where we'll leave it. Alan also mentioned a few modification on the instruction set architecture that one can attempt in his tutorial, so if you're interested do check it out!

The code for this project is available at [https://github.com/cwkang1998/stark-brainfuck](https://github.com/cwkang1998/stark-brainfuck). There's also a video of our presentation on youtube [here](https://www.youtube.com/watch?v=dR7UNjmmY-I), although the video is in Mandarin (English subtitle is available).
