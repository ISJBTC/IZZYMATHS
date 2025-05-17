// data/questions/linear-algebra/chapter-1.ts

import { QuizQuestion } from '@/types/quiz-types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the definition of a matrix?",
    options: [
      "A rectangular array of numbers, symbols, or expressions arranged in rows and columns",
      "A square array of numbers with the same number of rows and columns",
      "A mathematical operation between two sets of numbers",
      "A collection of vectors in a vector space"
    ],
    correctAnswer: 0,
    explanation: "A matrix is defined as a rectangular array of numbers, symbols, or expressions arranged in rows and columns. A matrix with $m$ rows and $n$ columns is called an $m \\times n$ matrix."
  },
  {
    id: 2,
    question: "For matrix addition to be defined, what condition must be met?",
    options: [
      "The matrices must be of the same size (same number of rows and columns)",
      "The matrices must be square matrices",
      "The number of columns in the first matrix must equal the number of rows in the second matrix",
      "At least one of the matrices must be invertible"
    ],
    correctAnswer: 0,
    explanation: "Matrix addition is only defined for matrices of the same size (same number of rows and columns). The addition is performed element-wise."
  },
  {
    id: 3,
    question: "If $A$ is a $3\\times4$ matrix and $B$ is a $4\\times2$ matrix, what is the size of the product $AB$?",
    options: [
      "$3\\times2$",
      "$4\\times3$",
      "$3\\times3$",
      "$4\\times4$"
    ],
    correctAnswer: 0,
    explanation: "For matrix multiplication, if $A$ is $m\\times n$ and $B$ is $n\\times p$, then the product $AB$ is $m\\times p$. Here, $A$ is $3\\times4$ and $B$ is $4\\times2$, so the product $AB$ is $3\\times2$."
  },
  {
    id: 4,
    question: "What is the result of multiplying matrix $A = \\begin{bmatrix} 2 & 3 \\\\ 4 & 5 \\end{bmatrix}$ by scalar $3$?",
    options: [
      "$\\begin{bmatrix} 6 & 9 \\\\ 12 & 15 \\end{bmatrix}$",
      "$\\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & 3 & 2 & 3 \\\\ 4 & 5 & 4 & 5 \\end{bmatrix}$",
      "$\\begin{bmatrix} 6 & 6 \\\\ 12 & 15 \\end{bmatrix}$"
    ],
    correctAnswer: 0,
    explanation: "Scalar multiplication multiplies each element of the matrix by the scalar. So $3\\times\\begin{bmatrix} 2 & 3 \\\\ 4 & 5 \\end{bmatrix} = \\begin{bmatrix} 3\\times2 & 3\\times3 \\\\ 3\\times4 & 3\\times5 \\end{bmatrix} = \\begin{bmatrix} 6 & 9 \\\\ 12 & 15 \\end{bmatrix}$."
  },
  {
    id: 5,
    question: "What is the condition for matrix multiplication $AB$ to be defined?",
    options: [
      "The number of columns in $A$ must equal the number of rows in $B$",
      "A and B must be of the same size",
      "A and B must be square matrices",
      "The number of rows in $A$ must equal the number of columns in $B$"
    ],
    correctAnswer: 0,
    explanation: "For matrix multiplication $AB$ to be defined, the number of columns in $A$ must equal the number of rows in $B$. If $A$ is $m\\times n$ and $B$ is $n\\times p$, then the product $AB$ is $m\\times p$."
  },
  {
    id: 6,
    question: "Which of the following is true regarding matrix multiplication?",
    options: [
      "Matrix multiplication is generally not commutative: $AB \\neq BA$",
      "Matrix multiplication is always commutative: $AB = BA$",
      "Matrix multiplication is only defined for square matrices",
      "Matrix multiplication is distributive over subtraction but not addition"
    ],
    correctAnswer: 0,
    explanation: "Matrix multiplication is generally not commutative, meaning that for most matrices $A$ and $B$, $AB \\neq BA$. In fact, sometimes one product is defined while the other isn't, depending on the dimensions."
  },
  {
    id: 7,
    question: "What is the determinant of the $2\\times2$ matrix $\\begin{bmatrix} 3 & 4 \\\\ 5 & 7 \\end{bmatrix}$?",
    options: [
      "1",
      "0",
      "-1",
      "21"
    ],
    correctAnswer: 0,
    explanation: "For a $2\\times2$ matrix $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, the determinant is $ad - bc$. So for $\\begin{bmatrix} 3 & 4 \\\\ 5 & 7 \\end{bmatrix}$, the determinant is $3\\times7 - 4\\times5 = 21 - 20 = 1$."
  },
  {
    id: 8,
    question: "What is the transpose of matrix $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$?",
    options: [
      "$\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$",
      "$\\begin{bmatrix} 6 & 5 & 4 \\\\ 3 & 2 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{bmatrix}$"
    ],
    correctAnswer: 0,
    explanation: "The transpose of a matrix swaps its rows and columns. So the transpose of $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$ is $A^T = \\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}$."
  },
  {
    id: 9,
    question: "Which type of matrix has all elements equal to zero?",
    options: [
      "Zero matrix",
      "Identity matrix",
      "Diagonal matrix",
      "Orthogonal matrix"
    ],
    correctAnswer: 0,
    explanation: "A zero matrix, denoted as $O$, is a matrix with all elements equal to zero."
  },
  {
    id: 10,
    question: "Which matrix has ones along the main diagonal and zeros elsewhere?",
    options: [
      "Identity matrix",
      "Diagonal matrix",
      "Upper triangular matrix",
      "Zero matrix"
    ],
    correctAnswer: 0,
    explanation: "The identity matrix, denoted as $I$, has ones along the main diagonal and zeros elsewhere. It serves as the multiplicative identity for matrices."
  },
  {
    id: 11,
    question: "If $A$ is a square matrix and $\\det(A) = 0$, what can we conclude?",
    options: [
      "$A$ is not invertible (singular)",
      "$A$ is invertible (non-singular)",
      "$A$ is a diagonal matrix",
      "$A$ is symmetric"
    ],
    correctAnswer: 0,
    explanation: "A square matrix $A$ is invertible if and only if its determinant is non-zero. If $\\det(A) = 0$, then $A$ is not invertible and is called a singular matrix."
  },
  {
    id: 12,
    question: "What is the inverse of the $2\\times2$ matrix $\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$?",
    options: [
      "$\\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} -1 & 1 \\\\ 1 & -2 \\end{bmatrix}$",
      "The matrix is not invertible"
    ],
    correctAnswer: 0,
    explanation: "For a $2\\times2$ matrix $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, the inverse is $\\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$. For $\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$, the determinant is $2\\times1 - 1\\times1 = 1$, so the inverse is $\\frac{1}{1}\\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix} = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}$."
  },
  {
    id: 13,
    question: "Which of the following elementary row operations does NOT change the determinant of a matrix?",
    options: [
      "Adding a multiple of one row to another row",
      "Interchanging two rows",
      "Multiplying a row by a non-zero scalar",
      "All of these operations change the determinant"
    ],
    correctAnswer: 0,
    explanation: "Adding a multiple of one row to another row does not change the determinant of a matrix. Interchanging two rows multiplies the determinant by $-1$, and multiplying a row by a scalar $k$ multiplies the determinant by $k$."
  },
  {
    id: 14,
    question: "A square matrix that equals its transpose ($A = A^T$) is called:",
    options: [
      "Symmetric matrix",
      "Skew-symmetric matrix",
      "Orthogonal matrix",
      "Diagonal matrix"
    ],
    correctAnswer: 0,
    explanation: "A symmetric matrix is a square matrix that equals its transpose: $A = A^T$. This means $a_{ij} = a_{ji}$ for all indices $i$ and $j$."
  },
  {
    id: 15,
    question: "What is the determinant of a $3\\times3$ matrix with a row of all zeros?",
    options: [
      "0",
      "1",
      "-1",
      "Cannot be determined without additional information"
    ],
    correctAnswer: 0,
    explanation: "If any row or column of a matrix contains only zeros, then its determinant is zero. This is a fundamental property of determinants."
  },
  {
    id: 16,
    question: "Which of the following is true about the determinant of a product of matrices?",
    options: [
      "$\\det(AB) = \\det(A) \\times \\det(B)$",
      "$\\det(AB) = \\det(A) + \\det(B)$",
      "$\\det(AB) = \\det(A) - \\det(B)$",
      "$\\det(AB) = \\det(A) / \\det(B)$"
    ],
    correctAnswer: 0,
    explanation: "The determinant of a product of matrices equals the product of their determinants: $\\det(AB) = \\det(A) \\times \\det(B)$. This is a multiplicative property of determinants."
  },
  {
    id: 17,
    question: "A square matrix that equals the negative of its transpose ($A = -A^T$) is called:",
    options: [
      "Skew-symmetric matrix",
      "Symmetric matrix",
      "Orthogonal matrix",
      "Diagonal matrix"
    ],
    correctAnswer: 0,
    explanation: "A skew-symmetric matrix is a square matrix that equals the negative of its transpose: $A = -A^T$. This means $a_{ij} = -a_{ji}$ for all indices $i$ and $j$."
  },
  {
    id: 18,
    question: "What is the relationship between $\\det(A)$ and $\\det(A^T)$?",
    options: [
      "$\\det(A) = \\det(A^T)$",
      "$\\det(A) = -\\det(A^T)$",
      "$\\det(A) = 1/\\det(A^T)$",
      "$\\det(A)$ and $\\det(A^T)$ are unrelated"
    ],
    correctAnswer: 0,
    explanation: "The determinant of a matrix equals the determinant of its transpose: $\\det(A) = \\det(A^T)$. This is a fundamental property of determinants."
  },
  {
    id: 19,
    question: "To find the inverse of a matrix using elementary row operations, what is the initial augmented matrix?",
    options: [
      "$[A|I]$",
      "$[I|A]$",
      "$[A|0]$",
      "$[0|A]$"
    ],
    correctAnswer: 0,
    explanation: "To find the inverse of a matrix $A$ using elementary row operations, we form the augmented matrix $[A|I]$, where $I$ is the identity matrix. We then apply row operations to transform $A$ into $I$, which simultaneously transforms $I$ into $A^{-1}$."
  },
  {
    id: 20,
    question: "Which type of matrix has all elements above the main diagonal equal to zero?",
    options: [
      "Lower triangular matrix",
      "Upper triangular matrix",
      "Diagonal matrix",
      "Identity matrix"
    ],
    correctAnswer: 0,
    explanation: "A lower triangular matrix has all elements above the main diagonal equal to zero. In contrast, an upper triangular matrix has all elements below the main diagonal equal to zero."
  },
  {
    id: 21,
    question: "The cofactor $C_{ij}$ of an element $a_{ij}$ in a matrix is defined as:",
    options: [
      "$C_{ij} = (-1)^{i+j} \\times M_{ij}$, where $M_{ij}$ is the minor",
      "$C_{ij} = a_{ij} \\times M_{ij}$, where $M_{ij}$ is the minor",
      "$C_{ij} = (-1)^{i+j} \\times a_{ij}$",
      "$C_{ij} = M_{ij}$, where $M_{ij}$ is the minor"
    ],
    correctAnswer: 0,
    explanation: "The cofactor $C_{ij}$ of an element $a_{ij}$ is defined as $C_{ij} = (-1)^{i+j} \\times M_{ij}$, where $M_{ij}$ is the minor of $a_{ij}$ (determinant of the submatrix obtained by deleting the $i$-th row and $j$-th column)."
  },
  {
    id: 22,
    question: "Using Sarrus' rule, what is the determinant of $\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{bmatrix}$?",
    options: [
      "0",
      "1",
      "45",
      "-45"
    ],
    correctAnswer: 0,
    explanation: "Using Sarrus' rule: $(1\\times5\\times9 + 2\\times6\\times7 + 3\\times4\\times8) - (3\\times5\\times7 + 1\\times6\\times8 + 2\\times4\\times9) = (45 + 84 + 96) - (105 + 48 + 72) = 225 - 225 = 0$."
  },
  {
    id: 23,
    question: "What is the adjoint of a matrix?",
    options: [
      "The transpose of the cofactor matrix",
      "The inverse of the matrix",
      "The transpose of the matrix",
      "The determinant of the matrix"
    ],
    correctAnswer: 0,
    explanation: "The adjoint (or adjugate) of a matrix $A$ is the transpose of the cofactor matrix of $A$. It is used in the formula $A^{-1} = \\frac{1}{\\det(A)} \\times \\text{adj}(A)$ to find the inverse of $A$."
  },
  {
    id: 24,
    question: "For a $3\\times3$ matrix, how many cofactors are there?",
    options: [
      "9",
      "3",
      "6",
      "27"
    ],
    correctAnswer: 0,
    explanation: "For an $n\\times n$ matrix, there are $n^2$ cofactors, one for each element of the matrix. So for a $3\\times3$ matrix, there are $3^2 = 9$ cofactors."
  },
  {
    id: 25,
    question: "What is the result of multiplying any matrix $A$ by the identity matrix $I$?",
    options: [
      "$A$",
      "$A^T$",
      "$A^{-1}$",
      "0"
    ],
    correctAnswer: 0,
    explanation: "The identity matrix $I$ has the property that $AI = IA = A$ for any matrix $A$ of compatible size. This is why $I$ is called the multiplicative identity for matrices."
  }
];

export default questions;