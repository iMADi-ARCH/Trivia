"use client";
import { FC, useEffect, useState } from "react";
import Option from "./Option";
import { decode } from "he";
import { shuffle } from "@/lib/utils";
import { Question } from "@/lib/types";
import DifficultyTag from "./DifficultyTag";

interface MCQuestionProps {
    index: number;
    question: Question;
}

const MCQuestion: FC<MCQuestionProps> = ({ index, question }) => {
    const [attempted, setAttempted] = useState<boolean>(false);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        setOptions(
            shuffle([question.correct_answer, ...question.incorrect_answers])
        );
    }, [question]);
    const checkAnswer = (ans: string) => {
        return ans === question.correct_answer;
    };

    return (
        <div className={`flex flex-col gap-4 `}>
            <h2 className="flex gap-3 text-2xl font-semibold">
                <span>{index + 1}. </span>
                <span>{decode(question.question)}</span>
            </h2>
            <ul className="grid grid-cols-2 gap-4 w-full">
                {options.map((option, i) => (
                    <li className="list-item" key={i}>
                        <Option
                            attempt={{ attempted, setAttempted }}
                            isCorrect={checkAnswer(option)}
                            key={i}
                        >
                            {decode(option)}
                        </Option>
                    </li>
                ))}
            </ul>
            <DifficultyTag
                className="self-end"
                difficulty={question.difficulty}
            />
        </div>
    );
};

export default MCQuestion;
