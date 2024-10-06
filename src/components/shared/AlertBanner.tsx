import { AlertTriangle, Github } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "../ui/alert"
import Link from "next/link";

export default function AlertBanner({}) {
    return (
        <Alert className=" bg-black border-yellow-50   flex flex-col items-center text-center p-2  mx-auto">

            <AlertTitle className="text-yellow-800 dark:text-yellow-300 text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                I need your support
            </AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-400 mt-1 flex flex-col items-center">
                <p className="flex items-center gap-2">
                    Everyone can contribute to my GitHub repo.
                    <span className="flex items-center gap-1"><Github className="h-4 w-4"/> <Link href="https://github.com/pixprocoder">pixprocoder</Link></span>
                </p>

            </AlertDescription>
        </Alert>
    )
}