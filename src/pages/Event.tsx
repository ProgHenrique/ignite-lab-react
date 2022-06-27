import { isPast, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { useIsAvailableLessonQuery } from "../graphql/generated";

interface IsAvailable {

}

export function Event() {

  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-1">
          <div className="flex-1" />
          <Sidebar />
        </main>
      </div>
    )
  }

  const { data } = useIsAvailableLessonQuery({
    variables: {
      slug: slug
    }
  })

  if (!data || !data.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    )
  }


  const isLessonAvailable = isPast(parseISO(data?.lesson?.availableAt))


  return (

    <div className="flex flex-col min-h-screen" >
      <main className="flex flex-1">

        {isLessonAvailable
          ? <Video lessonSlug={slug} />
          : <div className="flex-1" />
        }
        <Sidebar />
      </main>
    </div>
  )
}