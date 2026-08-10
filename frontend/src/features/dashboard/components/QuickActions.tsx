import { ArrowRight, FileText, Newspaper, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../../../components/common/Card";

const actions = [
    {
        title: "Crear noticia",
        description: "Registrar una nueva fuente o pieza editorial para revisión.",
        href: "/news/create",
        icon: FileText,
    },
    {
        title: "Ver noticias",
        description: "Consultar el catálogo histórico y su estado actual.",
        href: "/news",
        icon: Newspaper,
    },
    {
        title: "Analizar Fake News",
        description: "Validar una afirmación con la base de conocimiento y el motor RAG.",
        href: "/rag",
        icon: ShieldCheck,
    },
];

export default function QuickActions() {
    return (
        <Card title="Acciones rápidas" description="Tareas frecuentes del flujo operativo">
            <div className="space-y-3">
                {actions.map(({ title, description, href, icon: Icon }) => (
                    <Link
                        key={title}
                        to={href}
                        className="group flex items-center gap-3 rounded-2xl border border-[#E3EFE5] bg-[#F8FBF9] p-4 transition hover:border-[#BFE0C8] hover:bg-[#F1FAF4]"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF7F0] text-[#1F7A4E]">
                            <Icon className="h-5 w-5" />
                        </div>

                        <div className="flex-1">
                            <p className="font-semibold text-[#123B2D]">{title}</p>
                            <p className="mt-1 text-sm text-[#5E6C61]">{description}</p>
                        </div>

                        <ArrowRight className="h-4 w-4 text-[#1F7A4E] transition group-hover:translate-x-0.5" />
                    </Link>
                ))}
            </div>
        </Card>
    );
}
