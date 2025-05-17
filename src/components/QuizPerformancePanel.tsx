import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, PieChart, Award, Expand, Minimize, ArrowUpDown } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface QuizPerformanceProps {
  topic: string;
}

const QuizPerformancePanel: React.FC<QuizPerformanceProps> = ({ topic }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [sortByScore, setSortByScore] = useState<boolean>(false);
  
  // Sample performance data - in a real app, this would come from a database
  const getPerformanceData = () => {
    const baseData = [
      { chapter: 'Ch 1', score: Math.floor(Math.random() * 40) + 60, questions: 25, completed: true },
      { chapter: 'Ch 2', score: Math.floor(Math.random() * 40) + 60, questions: 30, completed: true },
      { chapter: 'Ch 3', score: Math.floor(Math.random() * 40) + 60, questions: 27, completed: true },
      { chapter: 'Ch 4', score: Math.floor(Math.random() * 40) + 60, questions: 22, completed: true },
      { chapter: 'Ch 5', score: Math.floor(Math.random() * 40) + 60, questions: 28, completed: true },
      { chapter: 'Ch 6', score: Math.floor(Math.random() * 40) + 60, questions: 25, completed: true },
      { chapter: 'Ch 7', score: 0, questions: 30, completed: false },
      { chapter: 'Ch 8', score: 0, questions: 24, completed: false },
    ];
    
    // Add some variation based on the topic
    const topicSeed = topic.length % 5;
    return baseData.map(item => ({
      ...item,
      score: item.completed ? Math.max(0, Math.min(100, item.score + (topicSeed * 2 - 5))) : 0
    }));
  };
  
  const performanceData = getPerformanceData();
  
  // Sort data if needed
  const sortedData = [...performanceData].sort((a, b) => 
    sortByScore ? b.score - a.score : a.chapter.localeCompare(b.chapter)
  );
  
  // Calculate average score
  const avgScore = performanceData.reduce((sum, item) => sum + item.score, 0) / 
                    performanceData.filter(item => item.completed).length || 0;
  
  // Calculate total questions
  const totalQuestions = performanceData.reduce((sum, item) => sum + item.questions, 0);
  const answeredQuestions = performanceData
    .filter(item => item.completed)
    .reduce((sum, item) => sum + item.questions, 0);
  
  // Prepare pie chart data
  const pieData = [
    { name: 'Completed', value: performanceData.filter(d => d.completed).length, color: '#0088FE' },
    { name: 'Remaining', value: performanceData.filter(d => !d.completed).length, color: '#BBBBBB' }
  ];
  
  // Prepare progress pie chart data
  const progressData = [
    { name: 'Answered', value: answeredQuestions, color: '#4f46e5' },
    { name: 'Remaining', value: totalQuestions - answeredQuestions, color: '#e5e7eb' }
  ];
  
  // Best performing chapter
  const bestChapter = [...performanceData].sort((a, b) => b.score - a.score)[0];
  
  // Format topic name for display
  const formatTopicName = (topicName: string) => {
    return topicName
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
      .trim();
  };
  
  const displayName = formatTopicName(topic);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const toggleSort = () => {
    setSortByScore(!sortByScore);
  };

  // Custom tooltip component for bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">Score: <span className="font-medium">{data.score}%</span></p>
          <p className="text-sm">Questions: <span className="font-medium">{data.questions}</span></p>
          <p className="text-sm">Status: <span className={`font-medium ${data.completed ? 'text-green-500' : 'text-amber-500'}`}>
            {data.completed ? 'Completed' : 'Not Started'}
          </span></p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={`transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md p-4 ${expanded ? 'fixed inset-4 z-50 overflow-auto' : 'h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BarChart2 className="h-6 w-6 text-math-primary mr-2" />
          <h3 className="text-xl font-bold">{displayName} Performance</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpand}
          className="ml-auto"
        >
          {expanded ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
        </Button>
      </div>
      
      {expanded ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-math-primary">
                {isNaN(avgScore) ? 'N/A' : `${Math.round(avgScore)}%`}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Based on {performanceData.filter(item => item.completed).length} completed chapters
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Best Chapter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <div>
                  <div className="text-lg font-bold">{bestChapter.completed ? bestChapter.chapter : 'N/A'}</div>
                  <div className="text-sm text-gray-600">{bestChapter.completed ? `${bestChapter.score}%` : 'No chapters completed'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Question Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-2xl font-bold text-math-primary">
                {Math.round((answeredQuestions / totalQuestions) * 100)}%
              </div>
              <div className="text-sm text-gray-600">
                {answeredQuestions} / {totalQuestions} questions
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="mb-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-math-primary">
                {isNaN(avgScore) ? 'N/A' : `${Math.round(avgScore)}%`}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Based on {performanceData.filter(item => item.completed).length} completed chapters
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {expanded ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Chapter Scores</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleSort}
                className="flex items-center gap-1 text-xs"
              >
                Sort by {sortByScore ? 'Chapter' : 'Score'}
                <ArrowUpDown className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedData}>
                    <XAxis dataKey="chapter" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]}>
                      {sortedData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.completed ? '#4f46e5' : '#e5e7eb'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg">Progress Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Chapter Completion</h4>
                  <div className="h-48 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => 
                            percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Question Completion</h4>
                  <div className="h-48 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={progressData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => 
                            percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                        >
                          {progressData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData}>
              <XAxis dataKey="chapter" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]}>
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.completed ? '#4f46e5' : '#e5e7eb'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {expanded && (
        <div className="mt-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg">Detailed Chapter Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chapter
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Questions
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.map((chapter, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {chapter.chapter}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {chapter.completed ? `${chapter.score}%` : '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {chapter.questions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            chapter.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {chapter.completed ? 'Completed' : 'Not Started'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuizPerformancePanel;